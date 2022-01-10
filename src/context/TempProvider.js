import React, {createContext, useState} from "react";
import {convertToCelsius, convertToFahrenheit} from "../helpers/Tools";

export const TempContext = createContext(null);

function TempContextProvider({ children }) {
    const [ selectedTemp, setSelectedTemp ] = useState("celsius");

    function selectTemp() {
        if(selectedTemp === "celsius") {
            setSelectedTemp("fahrenheit");
        } else {
            setSelectedTemp("celsius");
        }
    }

    return (
        <TempContext.Provider
            value={{
                selectTemp,
                kelvinToMetric: selectedTemp === "celsius" ? convertToCelsius : convertToFahrenheit
            }}>
            {children}
        </TempContext.Provider>
    );
}

export default TempContextProvider;