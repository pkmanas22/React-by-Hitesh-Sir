import './App.css'
import Card from './components/Card'

// https://tailwindcss.com/docs/guides/vite

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-green-600 text-black p-4 rounded-xl">
        Hello world!
      </h1>
      <Card username={"John Doe"} />
      <Card username={"Jane Doe"} btnText='Show more'/>
    </>
  )
}

export default App
