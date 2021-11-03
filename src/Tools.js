export function convertTemps(temp) {
    const celsius = temp - 273.15;
    return celsius.toFixed(0);
}

export function convertDt(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-EN", { weekday: "long" });
}

export function createTimeString(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-EN", { hour12: false, hour: "2-digit", minute: "2-digit" })
}