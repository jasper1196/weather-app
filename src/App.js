import React, { useState, useEffect, useContext } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from "axios";
import ForecastTab from "./pages/forecastTab/ForecastTab";
import { convertToCelsius } from "./helpers/Tools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import { TempContext } from "./context/TempProvider";

const apiKey = "84a305756a182da534022ef48cf11953";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [error, toggleError] = useState(false);
  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {

    async function fetchData() {
      toggleError(false);
      try {
        const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`)
        console.log(results.data);
        setWeatherData(results.data);
      } catch (e) {
        console.log(e);
        toggleError(true);
      }
    }

    if(location) {
      fetchData();
    }

  }, [location]);

  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar passLocation={setLocation}/>

          {error &&
            <span className="wrong-location-error">
              Oeps! Deze locatie bestaat niet
            </span>
          }

          {!error && !location &&
            <span className="no-forecast">
              Zoek eerst een locatie om het weer voor deze week te bekijken
            </span>
          }

          <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                  <h2>{weatherData.weather[0].description}</h2>
                  <h3>{weatherData.name}</h3>
                  <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
                </>
            }
            </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">

          <Router>

            <TabBarMenu/>

            <div className="tab-wrapper">

              <Switch>

                <Route path="/komende-week">
                  <ForecastTab coordinates={weatherData.coord} />
                </Route>

                <Route path="/" exact>
                  <TodayTab coordinates={weatherData.coord} />
                </Route>

              </Switch>

            </div>

          </Router>

        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
