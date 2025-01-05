import axios from 'axios'

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const getWeather = (latlng) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`
    return axios.get(url).then(response => response.data)
}

export default {
    getWeather: getWeather
}



