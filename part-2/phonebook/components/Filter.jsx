const Filter = ({ text, handleChange }) => (
  <div>
    <span>filter shown with</span>
    <input value={text} onChange={handleChange}/>
  </div>
)

export default Filter