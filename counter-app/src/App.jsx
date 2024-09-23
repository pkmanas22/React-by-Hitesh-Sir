import { useState } from 'react'
import './App.css'

function App() {
  let [counter, setCounter] = useState(0)

  const addValue = () => {
    counter = counter + 1
    setCounter(counter)
    console.log("Clicked ", counter)
  }

  const removeValue = () => {
    setCounter(counter - 1)
    console.log("Clicked ", counter)
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
