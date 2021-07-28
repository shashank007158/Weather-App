import React, { useRef, useState } from "react";
import axios from "axios";
import "./City-Form.scss";
import { createApi } from "unsplash-js";

import Report from "./Report";
const CityForm = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({});
  const [showData, setShowData] = useState();
  const [loading, setLoading] = useState(false);

  const unsplash = createApi({
    accessKey: "2MXNl14MpRuDxO1nGmkgY1_ckF46U766ZU1jfmWeT80",
  });
  const onBackClick = () => {
    setShowData();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const inputData = inputRef.current.value;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=0172d63071e28ab91b9bd502912277b0&units=metric`
      );

      const data = await res.data;
      const image = await unsplash.search.getPhotos({
        query: inputData,
        page: 1,
        perPage: 10,
        orientation: "landscape",
      });
      const num = Math.round(Math.random() * 10);
      const imagedata = await image.response.results[num].urls.full;
      setWeatherData({
        description: data.weather[0].description,
        humidity: data.main.humidity,
        temperature: data.main.temp,
        feels_like_temp: data.main.feels_like,
        pressure: data.main.pressure,
        cityName: data.name,
        windSpeed: data.wind.speed,
        weather_icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        image: imagedata,
      });
      setLoading(false);
      setShowData(true);
    } catch (error) {
      setLoading(false);
      setShowData(false);
    }
  };
  return (
    <div>
      {!showData && (
        <div>
          <h1 className="page-title">Weather App</h1>
          <section className="form-section">
            {loading && <p className="form--load">Loading...</p>}
            {showData === false && (
              <p className="form--alert">Enter a valid city name!!</p>
            )}
            <form className="form" onSubmit={submitHandler}>
              <label htmlFor="form-input" className="form--label">
                Enter your City Name
              </label>
              <input
                type="text"
                ref={inputRef}
                id="form-input"
                className="form--input"
                autoComplete="off"
                required
              />

              <button className="form--submit">Know the Weather</button>
            </form>
          </section>
        </div>
      )}

      {showData === true && (
        <Report data={weatherData} backHandler={onBackClick} />
      )}
    </div>
  );
};
export default CityForm;
