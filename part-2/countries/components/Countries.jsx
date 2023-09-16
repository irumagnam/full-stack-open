const Countries = ({ list, handleShowCountry }) => (
  <ul>
    {list.map(country =>
      <li key={country.ccn3}>
        {country.name.common}
        <button onClick={() => handleShowCountry(country)}>show</button>
      </li>
    )}
  </ul>
)

export default Countries