import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountries = () => {
    return axios.get(`${baseUrl}/all`).then(response => response.data)
}

const getCountryByName = (name) => {
    return axios.get(`${baseUrl}/name/${name}`).then(response => response.data)
}

export default {
    getCountries: getCountries,
    getCountryByName: getCountryByName
}