import styles from './WeatherDetails.module.scss';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement} from 'chart.js';
import {addTemp ,deleteTemp} from '../../Actions/index';
import { IWeatherData } from '../../Models/weatherData';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

let graphData:any={
    labels:[],
    datasets:[{
        data:[]
    }]
}
const options={}
let sunrise: number;
let sunset: number;
let isCityExist: any;

const WeatherDetails = () => {
    const { state }: { state: any } = useLocation();
    const [weather, setWeather] = useState([]);
    const [cityExist, setCityExist] = useState([]);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const list = useSelector((state:any)=>state.reducer.list)
    
    const { lat, lon }: { lat: number; lon: number } = state;

    // declare the data fetching function
    const fetchData = async () => {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa29d7ef3c79c52007cff5ae3e87c506`);
        data.json().then(res => {
            isCityExist = list.map((e: any) => e.data).filter((a:any)=>a.name == res.name);  
            setCityExist(isCityExist)
            let cityData: any = [];
            cityData.push(res);
            sunrise = res.sys.sunrise;
            sunset = res.sys.sunset;
            setWeather(cityData);
      
        })
    }

    const showGraph = async () => {
        const foreCastData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=10&lat=${lat}&lon=${lon}&appid=fa29d7ef3c79c52007cff5ae3e87c506`);
        foreCastData.json().then(res => {
            const dateTime = res.list.map((item: IWeatherData) => showCurrentTime(item.dt));
            const main  = res.list.map((item: IWeatherData) => item.main);
            const temp  = main.map((e:any)=> e.temp)
            graphData={
                labels:dateTime,
                datasets:[{
                    data:temp,
                    backgroundColor:'transparent',
                    borderColor:'#f26c6d',
                    pointBorderColor:'transparent',
                    pointBorderWidth:4
                }]
            }
        })
    }

    showGraph();

    useEffect(() => {
        fetchData();
    }, [])

    const showCurrentTime = (utc: number) => {
        let d = new Date(utc);
        let hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
        let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let ampm = d.getHours() < 12 ? 'AM' : 'PM';
        let time = hour + ':' + min + ' ' + ampm;
        return time;

    }

    const showSunrise = () => {
        let d = new Date(sunrise);
        let hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
        let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let ampm = d.getHours() < 12 ? 'AM' : 'PM';
        let time = hour + ':' + min + ' ' + ampm;
        return time;
    }

    const showSunset = () => {
        let d = new Date(sunset);
        let hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
        let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let ampm = d.getHours() < 12 ? 'AM' : 'PM';
        let time = hour + ':' + min + ' ' + ampm;
        return time;

    }
    const isCityAdded = (data:any) =>{
        setCityExist(data);
    }

    const isCityDeleted = () =>{
        setCityExist([]);     
    }


    //Navigate to dashboard
    async function goToDashboard() {
        navigate("/", { replace: true });
    }
    return (
        <div className={styles.container}>
            <div className={styles.pageNav}>
                <p className={styles.backBtn} data-testid="backBtn"
                    onClick={() => goToDashboard()}><i className="fas fa-angle-left"
                        style={{ color: "black", marginRight:'6px' }}></i>Back</p>
                {cityExist?.length == 0 ?
                    weather && weather.map((item: any, index: any) =>
                    (
                        <Button variant="outline-success" data-testid="addToList"
                            onClick={() => { dispatch(addTemp(item)); isCityAdded(item) }}
                            key={index}>Add to list<i className="fas fa-plus-circle"
                            ></i></Button>
                    )) : weather && weather.map((item: any, index: any) => (
                        <div key={index}><Button  data-testid="alreadyAdded"
                            variant="success"
                        >Already Added</Button>
                            <Button
                                variant="danger"  data-testid="removeBtn"
                                onClick={() => { dispatch(deleteTemp(item)); isCityDeleted() }}
                                className={styles.removeBtn}>Remove</Button></div>
                    ))}
            </div>
            {weather && weather.map((item: any, index: any) => (
                <div className={styles.showTemp}
                    key={index}>
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
                 className={styles.weatherImage} />
                    <p>{item.name}</p>
                    <h2>{(item.main.temp - 273).toString().slice(0, 4)}<span>&#176;</span></h2>
                </div>))}
            <div className={styles.miscReadings}>
                <table className={styles.miscHeader}
                    data-testid="tableItem">
                    <thead>
                        <tr>
                            <td>TIME</td>
                            <td>PRESSURE</td>
                            <td>%RAIN</td>
                            <td>HUMIDITY</td>
                        </tr>
                    </thead>
                    <tbody>
                        {weather && weather.map((item: any, index: any) => (
                            <tr className={styles.miscValues} key={index}>
                                <td>{showCurrentTime(item.dt)}</td>
                                <td>{item.main.pressure}</td>
                                <td>58%</td>
                                <td>{item.main.humidity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.sunrise}>
                    <p>Sunrise: {showSunrise()}</p>
                    <p>Sunset: {showSunset()}</p>
                </div>
                <div className={styles.graph}>
                    <Line data={graphData} options={options}></Line>
                </div>

            </div>
        </div>
    );
};

export default WeatherDetails;
