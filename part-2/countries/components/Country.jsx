import Weather from "./Weather"

const Country = ({ info }) => (
  <div>
    <h3>{info.name.common}</h3>
    <div>capital {info.capital}</div>
    <div>area {info.area}</div>
    <div>
      <h4>languages</h4>
      <ul>
        {Object.keys(info.languages).map(id => 
          <li key={id}>{info.languages[id]}</li>
        )}
      </ul>
    </div>
    <div>
      <img src={info.flags.png} />
    </div>
    <Weather country={info} latlng={info.latlng} />
  </div>
)

export default Country