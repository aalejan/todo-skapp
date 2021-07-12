import { useState } from "react"

const TodoForm = ({addTodo}) => {
    const [todo, setTodo] = useState({
        id: '',
        task: ''
    })

    function handleInputChange(e){
        setTodo({...todo, task: e.target.value })
    }

    return(
        <form>
            <input
            name='task'
            value={todo.task}
             onChange={handleInputChange} type="text" />
            <button type='submit' >Add Todo</button>
        </form>
    )
}

export default TodoForm