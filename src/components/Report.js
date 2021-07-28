import React from "react";
import "./Report.scss";
const Report = (props) => {
  const {
    description,
    humidity,
    feels_like_temp,
    temperature,
    weather_icon,
    cityName,
    pressure,
    windSpeed,
    image,
  } = props.data;
  return (
    <div>
      <div className="bg">
        <img src={image} alt={cityName} />
      </div>
      <section className="report-card">
        <div className="back-button" onClick={props.backHandler}>
          ←
        </div>
        <div className="report-city">{cityName}</div>
        <div className="report-description">
          <div>
            <img
              src={weather_icon}
              className="report-icon"
              alt="weather-icon"
            />
          </div>
          <div>
            <p className="report-temp">{temperature} &deg;C</p>
          </div>
        </div>
        <div className="report-additional">
          <div>
            <div className="report-additional_description">
              {description.charAt(0).toUpperCase() + description.slice(1)}
            </div>
            <div className="report-additional_humidity">
              <span> Humidity:</span> {humidity}%
            </div>
            <div className="report-additional_wind-speed">
              <span>Wind Speed:</span> {windSpeed} kmph
            </div>
          </div>
          <div>
            <div className="min-temp">
              <span>Min. Temperature:</span> {Math.round(temperature - 5)}{" "}
              &deg;C
            </div>
            <div className="report-additional_feels-like">
              <span>Feels Like:</span> {feels_like_temp} &deg;C
            </div>
            <div className="report-additional_pressure">
              <span> Pressure:</span> {pressure}Pa
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Report;
