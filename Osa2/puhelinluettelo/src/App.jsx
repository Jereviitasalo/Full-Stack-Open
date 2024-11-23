import { useState } from 'react'

const PersonForm = (props) => {

  return (
    <form onSubmit={props.addName}>
      <div>Name: <input value={props.newName} onChange={props.handleNameChange}/></div>
      <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

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
      <div><div>Filter shown with <input onChange={handleStringChange}/></div></div>

      <div><PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>
      </div>
      <h2>Numbers</h2>
      {filteredPersons.map(element => 
        <div key={element.name}>
          {element.name} {element.number}
        </div>)}
    </div>
  )

}

export default App
