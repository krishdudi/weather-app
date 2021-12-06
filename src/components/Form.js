import React, {useState} from 'react'
import axios from 'axios';
import Weather from './Weather';
import '../App.css'


const Form = () => {
    const API_KEY = process.env.REACT_APP_WEATHER_API
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const fetchData = e => {
      e.preventDefault();
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`
        )
        .then(res =>
          setWeather({
            city: res.data.name,
            country: res.data.sys.country,
            temperature: Math.round(res.data.main.temp - 273.15),
            description: res.data.weather[0].description,
            windSpeed: res.data.wind.speed,
            cloud: res.data.clouds.all,
            humidity: res.data.main.humidity,
            main: res.data.weather[0].main,
            error: ''
          })
        )
        .catch(error =>
          setWeather({
            error: 'Please Type Correctly'
          })
        );
      setCity('');
      setCountry('');
      console.log(weather)
    };
  
    return (
      <React.Fragment>
        <form className='form' onSubmit={fetchData} >
          <input
            type='text'
            placeholder='City'
            className='city'
            required
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <input
            type='text'
            placeholder='Country'
            className='country'
            required
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
        <Weather weather={weather} />
      </React.Fragment>
    );
  };
  
  export default Form;
