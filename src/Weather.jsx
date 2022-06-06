import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";

function Weather() {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[date.getDay()];
  const currentDate = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const apiKey = "9dccf6e71acad4d54bc32b9703baf19b";
  const [city, setCity] = useState("");
  const [displayCity, setdisplayCity] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    cityname: "",
    country: "",
    info: "",
    description: "",
    temperature: "",
    feelsLike: "",
    tempMin: "",
    tempMax: "",
  });
  const [weatherIcon, setWeatherIcon] = useState("crescent-moon");
  const [background, setBackground] = useState("background");

  const searchCity = (e) => {
    let currentCity = e.target.value;
    setCity(currentCity);
  };

  useEffect(() => {
    switch (weatherInfo.info) {
      case "Clouds":
        setWeatherIcon("cloudy");
        setBackground("background clouds");
        break;
      case "Clear":
        setWeatherIcon("clear-sky");
        setBackground("background clear");
        break;
      case "Snow":
        setWeatherIcon("snowy");
        setBackground("background snow");
        break;
      case "Rain":
        setWeatherIcon("rainy");
        setBackground("background rain");
        break;
      case "Drizzle":
        setWeatherIcon("drizzle");
        setBackground("background rain");
        break;
      case "Thunderstorm":
        setWeatherIcon("thunderstorm");
        setBackground("background thunder");
        break;
      default:
        setWeatherIcon("mist");
        setBackground("background mist");
        break;
    }
  }, [displayCity]);

  const displayWeather = (currentCity) => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
    ).then((response) => {
      console.log(response.data.weather[0].main);

      setWeatherInfo({
        cityname: city,
        country: response.data.sys.country,
        info: response.data.weather[0].main,
        /* description: response.data.weather[0].description,*/
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
      });
      setdisplayCity(true);

      // el useState es asincrono... esto quiere decir que cuando seteas displayCity a true, todavia es false a la hora de hacer este if... para solucionarlo tenes que usar un useEffect.

      // el useEffect va a escuchar al estado displayCity, y va a ejecutar una funcion cuando cambie el estado. Ese es tu condicional.
      if (displayCity) {
      }

      /*  currentCity = "";
      setCity(currentCity);*/
    });
  };

  return (
    <div className={background}>
      <div className="container">
        <div className="search-container">
          <input
            className="search-button"
            type="text"
            onChange={searchCity}
            value={city}
          />
          <button onClick={displayWeather}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="card-container">
          <div className="date-box">
            <div>{`${day}, ${month} ${currentDate} ${year} ${hour}:${minutes}`}</div>
          </div>
          <div className="card">
            <div className="city-country">{`${weatherInfo.cityname}, ${weatherInfo.country}`}</div>
            <div div className="temp-icon">
              <div className="temp">
                {Math.round(weatherInfo.temperature)}°C
              </div>
              <div>
                <img src={`./img/${weatherIcon}.jpg`} alt={weatherIcon} />
              </div>
            </div>

            <div className="feels-like">
              <p>Feels like: {Math.round(weatherInfo.feelsLike)}°C</p>
            </div>
          </div>

          <div className="min-max-container">
            <div className="temp-min-max">
              <p>Min: {Math.round(weatherInfo.tempMin)}°C</p>
            </div>
            <div className="temp-min-max">
              <p>Max: {Math.round(weatherInfo.tempMax)}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
