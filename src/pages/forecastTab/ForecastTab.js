import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ForecastTab.css';
import { convertDt, convertTemps } from "../../Tools";

function ForecastTab( { coordinates, apiKey } ) {
    const [forecasts, setForecasts] = useState([]);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {

        async function fetchData() {
            toggleLoading(true);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}`);
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
                                {convertTemps(day.temp.day)}&deg; C
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
