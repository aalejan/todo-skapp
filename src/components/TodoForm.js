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
            addTodo({...todo, id: new Date().valueOf().toString()})

            setTodo({...todo, task : ''})
        }
    }

    return(
        <FormContainer className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                name='task'
                value={todo.task}
                onChange={handleInputChange} type="text" />
                <button type='submit' >Add Todo</button>
            </form>
        </FormContainer>
    )

}

const FormContainer = styled.div `
       

       form{
           background: #f76c6c;
           width: 100%;
           padding: 5rem;
           border-radius: 10px;
           button{
            border: 3px solid white;
            padding:0.5em 1.1em;  
            margin-left: 1em;
            cursor: pointer;
            transition: all .5s ease;
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            line-height: 1;
            outline: none;
            border-radius: 4px;
            background-color : transparent;
            :hover {
            color: #001F3F;
            
            background-color: #fff;
            }
           }
       }
    `

export default TodoForm