import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './components/buttons/button'
import './App.css'

type ToDo = {
  id: string,
  description: string,
  finished: boolean,
  editOpen: boolean
}

const App = () => {

  const [toDos, setToDos] = useState<ToDo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [errorInput, setErrorInput] = useState("")
  const inputEl = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    const todoStorage = localStorage.getItem('todos')
    if (todoStorage) {
      setToDos(JSON.parse(todoStorage))
    }
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      toast('List has been updated!')
      localStorage.setItem('todos', JSON.stringify(toDos))
    }
  }, [toDos])

  useEffect(() => {
    document.title = "To-do's"
  }, []);

  // Logic for box check/uncheck
  const checkboxHandler = (index: number) => {
    const newTodos = [...toDos]
    newTodos[index].finished = !newTodos[index].finished
    setToDos(newTodos)
  }

  const addHandler = () => {
    if (!inputValue) {
      setErrorInput('This field is required')
      return
    }
    setErrorInput('')
    setToDos(
      [...toDos,
      {
        id: uuidv4(),
        description: inputValue,
        finished: false,
        editOpen: false
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

  const editToggleHandler = (index: number, open: boolean) => {
    const newToDos = [...toDos]
    newToDos[index].editOpen = open
    setToDos(newToDos)
  }

  const editInputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newToDos = [...toDos]
    newToDos[index].description = e.target.value
    setToDos(newToDos)
  }

  return (

    // Renders view
    <div className="App">

      <div className="header">
        <h1>To-do's</h1>
      </div>

      <input
        ref={inputEl}
        type="text"
        placeholder="Add item"
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value) }}
      />

      &nbsp;

      <Button text="Add" clickHandler={addHandler} /><br />
      <small>{errorInput && <span style={{ color: "red" }}>{errorInput}</span>}</small>

      &nbsp;&nbsp;

      <ul>
        {
          // Renders tasks and checkboxes
          toDos.map(({ description, finished, id, editOpen }, index) => {
            return (

              <li key={id}>

                {!editOpen ? (
                  <>
                    <input
                      type="checkbox"
                      checked={finished}
                      onChange={() => checkboxHandler(index)} />

                    {/* renders tasks */}
                    {description}

                    &nbsp;
                    <Button text="Delete" clickHandler={() => deleteHandler(index)} />
                    &nbsp;
                    <Button text="Copy" clickHandler={() => copyHandler(index)} />
                    &nbsp;
                    <Button text="Edit" clickHandler={() => editToggleHandler(index, true)} />
                  </>
                ) : (
                    <>
                      <input type="text" value={description} onChange={(e) => editInputHandler(e, index)} />
                      &nbsp;
                      <Button text="Save" clickHandler={() => editToggleHandler(index, false)} />
                    </>
                  )}
              </li>
            )
          })}
        <ToastContainer />
      </ul>
    </div>
  );
}
export default App;

