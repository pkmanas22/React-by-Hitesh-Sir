import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleEdit = (todo) => {
    setInput(todo.text)
    setEditId(todo.id)
  }

  const clearEdit = () => {
    setInput('')
    setEditId(null)
  }

  return (
    <>
      <div className='text-3xl font-bold'>Hello World with RDK </div>
      <AddTodo input={input} setInput={setInput} editId={editId} clearEdit={clearEdit}/>
      <Todos handleEdit={handleEdit}/>
    </>
  )
}

export default App
