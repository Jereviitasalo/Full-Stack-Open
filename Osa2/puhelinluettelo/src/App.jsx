import { useEffect, useState } from 'react'
import axios from 'axios'

const PersonForm = ({addName, handleNameChange, newName, newNumber, handleNumberChange}) => {

  return (
    <form onSubmit={addName}>
      <div>Name: <input value={newName} onChange={handleNameChange}/></div>
      <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter = ({searchString, handleStringChange}) => {
  return (
    <div>Filter shown with <input value={searchString} onChange={handleStringChange}/></div>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    filteredPersons.map(element =>
      <div key={element.name}>
        {element.name} {element.number}
      </div>
  )
)}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleStringChange = (event) => setSearchString(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}

    if (persons.some(user => user.name === personObject.name))
      alert(`${personObject.name} is already added to phonebook`)
    else  setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  const filteredPersons = persons.filter(person => person.name.includes(searchString))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleStringChange={handleStringChange} searchString={searchString}/>

      <h3>Add a new</h3>

      <div><PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>
      </div>

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons}/>
    </div>
  )

}

export default App
