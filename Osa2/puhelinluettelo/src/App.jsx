import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({filteredPersons, removeName}) => {
  return (
    filteredPersons.map(person =>
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => removeName(person.id)}>Delete</button>
      </div>
  )
)}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleStringChange = (event) => setSearchString(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    const personExists = persons.find(person => person.name === personObject.name)

    // Check if same name already exists
    if (personExists) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        // Update object to db.json/server
        personService
          .update(personExists.id, personObject)
          .then(response => setPersons(persons.map(person => person.id === personExists.id ? response : person)))
      }
    }
    else {
      // Add object to db.json/server
      personService
        .create(personObject)
        .then(response => {setPersons(persons.concat(response))})
    }
    setNewName("")
    setNewNumber("")
  }

  const removeName = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNewName("")
        setNewNumber("")
      }) 
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

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

      <Persons filteredPersons={filteredPersons} removeName={removeName}/>
    </div>
  )

}

export default App
