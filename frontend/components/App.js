import React from 'react'
import axios from 'axios'
import Character from './Character'
import {useState, useEffect} from 'react'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  // ❗ Create state to hold the data from the API
  const [rawPeople, setRawPeople] = useState(undefined)
  const [planets, setPlanets] = useState(undefined)
  const [people, setPeople] = useState(undefined)
  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    let promise1 = axios.get(urlPlanets)
    let promise2 = axios.get(urlPeople)

    Promise.all([promise1, promise2]).then(results => {
      const [planets, rawPeople] = results
      setPlanets(planets.data)
      setRawPeople(rawPeople.data)
    })  
  }, [])

  useEffect(() => {
    console.log('start')
    if (rawPeople !== undefined && planets !== undefined){
      let peoplePlanets = rawPeople.map(person => {
        let homeworld;
        planets.forEach(planet => {
          if (planet.id === person.homeworld){
            homeworld = planet
          }
        })
        return {...person, homeworld}
      })
      setPeople(peoplePlanets)
  }
  }, [rawPeople, planets])

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {people !== undefined ? people.map(person => {
        return <Character key={person.id} name={person.name} homeworld={person.homeworld.name} />
      }) : null}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
