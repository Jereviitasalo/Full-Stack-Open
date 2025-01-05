import { useState, useEffect } from 'react'
import countryInfoService from './services/countryInfoService'
import weatherService from './services/weatherService'

const FilteredCountryList = ({countries}) => {
  const [ country, setCountry] = useState(null)

  if (country) {
    return (
      <div>
        <SpecificCountry countryName={country}/>
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      <div>
        <SpecificCountry countryName={countries}/>
      </div>
    )
  }
  return (
    <div>
      <ul>
        {countries.map(country => <li key={country}>{country} <button onClick={() => setCountry(country)}>Show</button></li>)}
      </ul>
    </div>
  )
}

const SpecificCountry = ({countryName}) => {
  const [countryInfo, setCountryInfo] = useState({})
  const [ weatherInfo, setWeatherInfo] = useState(null)

  const getAllData = async () => {
    try {
      const countryData = await countryInfoService.getCountryByName(countryName)
      const countryInfoObject = {
        name: countryData.name.common,
        capital: countryData.capital,
        area: countryData.area,
        languages: Object.values(countryData.languages),
        flag: countryData.flags.png,
        latlng: countryData.capitalInfo.latlng
      }
      setCountryInfo(countryInfoObject)

      const weatherData = await weatherService.getWeather(countryInfoObject.latlng)
      const weatherInfoObject = {
        temperature: weatherData.main.temp,
        wind: weatherData.wind.speed,
        weatherIconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      }
      setWeatherInfo(weatherInfoObject)

    } catch (error) {console.log(error)}
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <div>
      {countryInfo ? (
        <>
          <h1>{countryInfo.name}</h1>
          <p style={{margin: 0}}>Capital {countryInfo.capital}</p>
          <p style={{margin: 0}}>Area {countryInfo.area}</p>
          <p style={{fontWeight: 'bold'}}>Languages:</p>
          <ul>
            {countryInfo.languages && countryInfo.languages.map((language, index) => <li key={index}>{language}</li>)}
          </ul>
          <img src={countryInfo.flag} alt={`Image of a flag of ${countryInfo.name}`} width='150'/>
        </>
      ) : (
        <p>Loading country data...</p>
      )}
      
      <h2>Weather in {countryInfo.capital}</h2>
      {weatherInfo ? (
        <>
          <p>Temperature {Math.round((weatherInfo.temperature - 273.15) * 100) / 100} celcius</p>
          <img src={weatherInfo.weatherIconUrl} alt="" />
          <p>Wind {weatherInfo.wind} m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

function App() {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState([])

  //console.log(searchWord)

  useEffect(() => {
    countryInfoService
      .getCountries()
      .then(response => {
        // const countryList = response.filter(country => country.name.common.toLowerCase().includes(searchWord))
        // console.log(countryList)
        // setCountries(countryList)

        const countryNames = response.map(country => country.name.common.toLowerCase())
        const filteredCountryNames = countryNames.filter(name => name.includes(searchWord))
        setCountries(filteredCountryNames)
      })
  }, [searchWord])

  return (
    <div>
      Find countries <input type="text" value={searchWord} onChange={event => setSearchWord(event.target.value)}/>
      <FilteredCountryList countries={countries}/>
    </div>
  )
}

export default App
