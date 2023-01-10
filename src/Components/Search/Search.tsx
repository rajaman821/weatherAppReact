import styles from './Search.module.scss';
import WeatherCard from '../WeatherCard/WeatherCard';
import { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import logo from '../../Assets/Group 2.png';
import WeatherCarousel from '../WeatherCarousel/WeatherCarousel';
import { useSelector } from 'react-redux';
import { ICities } from '../../Models/cities';
import { IWeatherData } from '../../Models/weatherData';


const Search = () => {
    const [message, setMessage] = useState('');
    const [cities, setCities] = useState<ICities[]>([]);
    const [citiesMatch, setCitiesMatch] = useState<ICities[]>([]);
    const [weather, setWeather] = useState([]);
    const list = useSelector((state: any) => state.reducer.list)

    //getting cities list
    const getData = () => {
        fetch('cities.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setCities(myJson);
            });
    }
    useEffect(() => {
        getData()
    }, [])

    //search cities in input field
    const searchCities = (text: string) => {
        let matches = cities.filter((city: ICities) => {
            const regex = new RegExp(`${text}`, "gi");
            return city.name.match(regex)
        })
        setCitiesMatch(matches);
        setMessage(text);
    }

    //setting the input field
    const setInputValue = (val: string) => {
        setMessage(val);
        setCitiesMatch([]);
    }

    const onSearch = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${message}&appid=fa29d7ef3c79c52007cff5ae3e87c506`;
        fetch(url)
            .then(response => response.json()).then((data:IWeatherData) => {
                let cityData: any = [];
                cityData.push(data)
                setWeather(cityData);
            });
    }

    return (
        <>
            <div className={styles.boxItems} data-testid="cartDetails">
                <div className={styles.box}>
                    <div className={styles.searchBox}>
                        <input type='text' placeholder='Search Location'
                            onChange={(e) => searchCities(e.target.value)}
                            value={message} />
                        <label className={styles.icon}
                            onClick={() => onSearch()}
                            style={{ cursor: 'pointer' }}>
                            <i
                                className="fa fa-search" data-testid="searchIcon"></i>
                        </label>
                    </div>
                    <div className={styles.badgeScroll}>
                        {citiesMatch && citiesMatch.map((item: any, index: any) => (
                            <Badge onClick={() => setInputValue(item.name)}
                                className={styles.badges}
                                key={index}
                                bg="light" text="dark"
                            >{item.name}
                            </Badge>))}
                    </div>
                    {weather.map((item: any, index: any) => (
                        <WeatherCard key={index} {...item} />
                    ))}
                    {weather.length == 0 && list.length == 0 ? (
                        <div className={styles.container}>
                            <img src={logo} height='34px' className={styles.weatherImg} />
                            <p className={styles.warningMsg} data-testid="msgText">
                                No location added to watchlist</p>
                        </div>
                    ) : <WeatherCarousel />}
                 
                </div>
            </div>
        </>
    )
}

export default Search