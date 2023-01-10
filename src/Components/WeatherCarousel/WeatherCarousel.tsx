import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { IWeatherData } from '../../Models/weatherData';
import styles from '../WeatherCarousel/WeatherCarousel.module.scss';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

let graphData: any = {
  labels: [],
  datasets: [{
    data: []
  }]
}
const options = {};
const WeatherCarousel = () => {

  const list = useSelector((state: any) => state.reducer.list)
  const cityData = list.map((e: any) => e.data);
  console.log(cityData);
  

  const showCurrentTime = (utc: number) => {
    let d = new Date(utc);
    let hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
    let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let ampm = d.getHours() < 12 ? 'AM' : 'PM';
    let time = hour + ':' + min + ' ' + ampm;
    return time;

  }

  const showSunriseSunset = (data: number) => {
    let d = new Date(data);
    let hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
    let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let ampm = d.getHours() < 12 ? 'AM' : 'PM';
    let time = hour + ':' + min + ' ' + ampm;
    return time;
  }


  const showGraph = async (lat: number, lon: number) => {
    const foreCastData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=10&lat=${lat}&lon=${lon}&appid=fa29d7ef3c79c52007cff5ae3e87c506`);
    foreCastData.json().then(res => {
      const dateTime = res.list.map((item: IWeatherData) => showCurrentTime(item.dt));
      const main = res.list.map((item: IWeatherData) => item.main);
      const temp = main.map((e: any) => e.temp)
      graphData = {
        labels: dateTime,
        datasets: [{
          data: temp,
          backgroundColor: 'transparent',
          borderColor: '#f26c6d',
          pointBorderColor: 'transparent',
          pointBorderWidth: 4
        }]
      }
      return graphData;
    })
  }


  return (
    <>

      <Carousel>
        {cityData.map((item: IWeatherData, index: any) => (
          <Carousel.Item className={styles.container}
           data-testid="carouselItem"
            key={index}>

            <div className={styles.showTemp}
            >
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                className={styles.weatherImage} />
              <p>{item.name}</p>
              <h2>{(item.main.temp - 273).toString().slice(0, 4)}<span>&#176;</span></h2>
            </div>
            <div className={styles.miscReadings}>
              <table className={styles.miscHeader}
                data-testid="tableItem">
                <thead>
                  <tr>
                    <td data-testid="time">TIME</td>
                    <td data-testid="pressure">PRESSURE</td>
                    <td data-testid="rain">%RAIN</td>
                    <td data-testid="humidity">HUMIDITY</td>
                  </tr>
                </thead>
                <tbody>

                  <tr className={styles.miscValues} key={index}>
                    <td>{showCurrentTime(item.dt)}</td>
                    <td>{item.main.pressure}</td>
                    <td>58%</td>
                    <td>{item.main.humidity}</td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.sunrise}>
                <p>Sunrise: {showSunriseSunset(item.sys.sunrise)}</p>
                <p>Sunset: {showSunriseSunset(item.sys.sunset)}</p>
              </div>
              <div className={styles.graph}>
                <Line data={graphData} options={options}></Line>
              </div>

            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default WeatherCarousel