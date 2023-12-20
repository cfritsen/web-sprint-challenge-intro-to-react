import React from 'react'
import {useState} from 'react'

function Character(props) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [showHomeworld, setHomeworld] = useState(false)
  const {name, homeworld} = props
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  function toggle(){
    setHomeworld(!showHomeworld)
  }
  return (
    <div className="character-card" onClick={toggle}>
      {/* Use the same markup with the same attributes as in the mock */}
      <h3 className="character-name">{name}</h3>
      {showHomeworld ? 
      <p>"Planet: <span className="character-planet">{homeworld}</span></p>
      : null}
    </div>
  )
}

export default Character
