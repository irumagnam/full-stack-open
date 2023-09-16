const PersonForm = ({ person, handleNameChange, handleNumberChange, handleFormSubmit }) => (
  <form>
    <div>
      <span>name:</span>
      <input value={person.name} onChange={handleNameChange}/>
    </div>
    <div>
      <span>number:</span>
      <input value={person.number} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit" onClick={handleFormSubmit}>add</button>
    </div>
  </form>
)

export default PersonForm