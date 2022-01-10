import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import './ForecastTab.css';
import { convertDt, convertToCelsius } from "../../helpers/Tools";
import {TempContext} from "../../context/TempProvider";


function ForecastTab( { coordinates } ) {
    const [forecasts, setForecasts] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const { kelvinToMetric } = useContext(TempContext);

    useEffect(() => {

        async function fetchData() {
            toggleLoading(true);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}`);
                console.log(result.data);
                setForecasts(result.data.daily.slice(1, 6));
            } catch (e) {
                console.log(e);
            }
            toggleLoading(false);
        }

        if(coordinates) {
            fetchData();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {loading && <span>Loading...</span>}
            {forecasts.map((day) => {
                return (
                    <article className="forecast-day" key={day.dt}>
                        <p className="day-description">
                            {convertDt(day.dt)}
                        </p>
                        <section className="forecast-weather">
                            <span>
                                {kelvinToMetric(day.temp.day)}
                            </span>
                            <span className="weather-description">
                                {day.weather[0].description}
                            </span>
                        </section>
                    </article>
                );
            })}

        </div>
    );
};

export default ForecastTab;
