import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import styles from './WeatherCard.module.scss';
import warningLogo from '../../Assets/warning.png';
import { IWeatherData } from '../../Models/weatherData';


const WeatherCard = (props: IWeatherData) => {
    const temp: any = (props.main.temp - 273).toString().slice(0, 4);
    const weatherImg = `https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`;

    const navigate = useNavigate();

    //Navigate to weather details
    async function goToWeatherDetails() {
        navigate('/weatherDetails', {
            state: {
                lat: props.coord.lat,
                lon: props.coord.lon
            }
        });
    }

    return (

        <>
            <Card style={{
                maxWidth: '22rem', marginTop: '2rem'
                , cursor: 'pointer'
            }}
                onClick={() => goToWeatherDetails()}
            >
                <Card.Body>
                    <div className={styles.cardHeader} data-testid="cardHeader">
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Title><i className="fas fa-angle-right"
                            onClick={() => goToWeatherDetails()}
                            style={{ cursor: 'pointer' }}
                        ></i></Card.Title>
                    </div>
                    <div className={styles.cardContent}>
                        <h1>{temp}<span>&#176;</span></h1>
                        <img src={weatherImg} className={styles.weatherImage} />
                    </div>
                    <div>
                        <div className={styles.cardFooter}>
                            <div className={styles.weatherMessage}>
                                <img src={warningLogo} height='34px' ></img>
                                <p className={styles.msg}>WARNING</p>
                            </div>
                            <p className={styles.msg}>{props.weather[0].description}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default WeatherCard