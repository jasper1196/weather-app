export function convertTemps(temp) {
    const celsius = temp - 273.15;
    return celsius.toFixed(0);
}

export function convertDt(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-EN", { weekday: "long" });
}