import Part from './Part'

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(partInfo => 
        <Part key={partInfo.id} partInfo={partInfo} />
      )}
    </div>
  )
}

export default Content
