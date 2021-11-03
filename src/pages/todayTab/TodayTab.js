import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import { convertTemps, createTimeString } from "../../Tools";

function TodayTab({ coordinates, apiKey }) {
	const [forecasts, setForecasts] = useState([]);
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {

		async function fetchData() {
			toggleError(false);
			toggleLoading(true);
			try {
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${apiKey}`);
				console.log(result.data);
				setForecasts([
					result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],
				]);
			} catch (e) {
				console.log(e)
				toggleError(true);
			}
			toggleLoading(false);
		}

		if(coordinates) {
			fetchData();
		}

	}, [coordinates])

	return(
		<div className="tab-wrapper">



			<div className="chart">
				{forecasts.map((forecast) => {
					return (
						<WeatherDetail
							temp={convertTemps(forecast.temp)}
							type={forecast.weather[0].main}
							description={forecast.weather[0].description}
							key={forecast.dt}
						/>
					)
				})}
			</div>

			{error &&
				<span>
					Er is iets misgegaan bij het ophalen van de voorspellingen.
				</span>
			}

			{!error && loading &&
				<span>
					Loading...
				</span>
			}

			<div className="legend">
				{forecasts.map((forecast) => {
					return <span key={`${forecast.dt}-forecast`}>{createTimeString(forecast.dt)} uur</span>
				})}
			</div>
		</div>
  );
};

export default TodayTab;
