import { useState } from "react"


function App() {
  const [color, setColor] = useState("");

  return (
    <div className="w-full h-screen duration-300"
      style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0">
        <div className="flex flex-wrap justify-center gap-3 bg-white rounded-xl px-3 py-2">
          <button className="bg-black text-white rounded-xl py-1 px-2 outline-none"
            onClick={() => {
              setColor('black')
            }} >Black</button>
          <button className="bg-green-500 text-white rounded-xl py-1 px-2 outline-none"
            onClick={() => {
              setColor('green')
            }} >Green</button>
          <button className="bg-yellow-600 text-white rounded-xl py-1 px-2 outline-none"
            onClick={() => {
              setColor('yellow')
            }} >Yellow</button>
          <button className="bg-blue-600 text-white rounded-xl py-1 px-2 outline-none"
            onClick={() => {
              setColor('blue')
            }} >Blue</button>
          <button className="bg-red-600 text-white rounded-xl py-1 px-2 outline-none"
            onClick={() => {
              setColor('red')
            }} >Red</button>
        </div>
      </div>
    </div>
  )
}

export default App
