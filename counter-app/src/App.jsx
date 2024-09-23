import { useState } from 'react'
import './App.css'

// L-5 Assignment:-  Write logic so that counter value is always between 0 and 20

function App() {
  let [counter, setCounter] = useState(0)

  const addValue = () => {
    if (counter < 20) {
      counter = counter + 1
      setCounter(counter)
      console.log("Clicked ", counter)
    } else {
      alert("Cannot add more than 20")
    }
  }

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    } else {
      alert("Cannot go below 0")
    }
  }

  return (
    <>
      <h1>Chai aur react</h1>

      <h2>Counter value: {counter}</h2>

      <button
        onClick={addValue}
      >Add value {counter}</button>

      <br />

      <button
        onClick={removeValue}
      >remove value {counter}</button>

      <p>footer: {counter}</p>
    </>
  )
}

export default App
