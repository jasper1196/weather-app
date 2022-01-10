export function convertToCelsius(temp) {
    const celsius = temp - 273.15;
    return `${celsius.toFixed(0)} °C`;
}

export function convertToFahrenheit(temp) {
    const fahrenheit = (temp - 273.15) * 1.8 + 32;
    return `${fahrenheit.toFixed(0)} °F`;
}

export function convertDt(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-EN", { weekday: "long" });
}

export function createTimeString(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-EN", { hour12: false, hour: "2-digit", minute: "2-digit" })
}