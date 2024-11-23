import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

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
