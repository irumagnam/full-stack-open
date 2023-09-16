const Persons = ({ list, handleDeletePerson }) => (
  <>
    {list.map(person =>
      <p key={person.id}>
        {person.id}: {person.name} {person.number}
        <button onClick={() => handleDeletePerson(person)}>delete</button>
      </p>
    )}
  </>
)

export default Persons