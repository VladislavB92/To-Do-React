import React, { useState } from 'react';
import Button from './components/buttons/button'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

type ToDo = {
  id: string,
  description: string,
  finished: boolean
}

const App = () => {

  const [toDos, setToDos] = useState<ToDo[]>([])
  const [inputValue, setInputValue] = useState("")

  // Logic for box check/uncheck
  const checkboxHandler = (index: number) => {
    const newTodos = [...toDos]
    newTodos[index].finished = !newTodos[index].finished
    setToDos(newTodos)
  }

  const addHandler = () => {
    if (!inputValue) {
      return
    }

    setToDos(
      [...toDos,
      {
        id: uuidv4(),
        description: inputValue,
        finished: false
      }
      ])
    setInputValue("")
  }

  const deleteHandler = (index: number) => {
    const newToDos = [...toDos]
    newToDos.splice(index, 1)
    setToDos(newToDos)
  }

  const copyHandler = (index: number) => {
    const newTodo = {
      ...toDos[index],
      id: uuidv4()
    }
    setToDos([...toDos, newTodo])
  }

  return (

    // Renders view
    <div className="App">

      <input type="text"
        placeholder="Add item"
        value={inputValue}
        onChange={
          (e) => { setInputValue(e.target.value) }}
      />

      <Button text="Add" clickHandler={addHandler} />

      <ul>
        {
          // Renders tasks and checkboxes
          toDos.map(({ description, finished, id }, index) => {
            return (

              <li key={id}>

                <input
                  type="checkbox"
                  checked={finished}
                  onChange={() => checkboxHandler(index)} />

                {/* renders tasks */}
                {description}

                <Button text="Delete" clickHandler={() => deleteHandler(index)} />
                <Button text="Copy" clickHandler={() => copyHandler(index)} />

              </li>
            )
          })}
      </ul>
    </div>
  );
}
export default App;
