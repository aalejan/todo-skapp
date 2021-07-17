import { useState } from "react"
import styled from 'styled-components'


const TodoForm = ({addTodo}) => {
    const [todo, setTodo] = useState({
        id: '',
        task: ''
    })

    function handleInputChange(e){
        setTodo({...todo, task: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(todo.task){
            addTodo({...todo,id: new Date().valueOf().toString()})

            setTodo({...todo, task : ''})
        }
    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                name='task'
                value={todo.task}
                onChange={handleInputChange} type="text" />
                <button type='submit' >Add Todo</button>
            </form>
        </div>
    )
}

export default TodoForm