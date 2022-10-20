import React from "react";
import { useState } from "react";
import axios from "axios";
import "./styles.css";
const App = () => {
  const [city, setCity] = useState("");
  const [Data, setData] = useState({});

  const getDetails = (cityName) => {
    if (!cityName) {
      alert("Enter city name...");
    }
    const api = `http://api.weatherstack.com/current?access_key=0a52d411588cba66f0a7f16345697c4b&query=${cityName}`;
    axios
      .get(api)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
        setCity("");
      })
      .catch((err) => {
        console.log("err", err);
        alert("City not found....");
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const handleSearch = () => {
    getDetails(city);
  };

  return (
    <div className="main-container">
      <div className="App">
        <h1 id="head">Weather App</h1>
        <input
          type="text"
          className="search"
          value={city}
          placeholder="Enter city name..."
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {Object.keys(Data).length > 0 && (
        <div className="city">
          <h2 className="city-name">
            <span>{Data?.location.name}</span>
            <sup>{Data.location.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(Data.current.temperature)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={Data.current.weather_icons}
              alt="climate-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
