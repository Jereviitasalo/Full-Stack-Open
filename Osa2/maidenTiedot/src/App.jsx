import { useState, useEffect } from 'react'
import countryInfoService from './services/countryInfoService'


const FilteredCountryList = ({countries}) => {
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
        {countries.map(country => <li key={country}>{country}</li>)}
      </ul>
    </div>
  )
}

const SpecificCountry = ({countryName}) => {
  const [countryInfo, setCountryInfo] = useState({})

  useEffect(() => {
    countryInfoService
    .getCountryByName(countryName)
    .then(response => {
      const countryInfoObject = {
        name: response.name.common,
        capital: response.capital,
        area: response.area,
        languages: Object.values(response.languages),
        flag: response.flags.png
      }
      setCountryInfo(countryInfoObject)
    })
  }, [])

  return (
    <div>
      <h1>{countryInfo.name}</h1>
      <p style={{margin: 0}}>Capital {countryInfo.capital}</p>
      <p style={{margin: 0}}>Area {countryInfo.area}</p>
      <p style={{fontWeight: 'bold'}}>Languages:</p>
      <ul>
        {countryInfo.languages && countryInfo.languages.map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={countryInfo.flag} alt={`Image of a flag of ${countryInfo.name}`} width='150'/>
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
