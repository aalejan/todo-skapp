import styled from "styled-components"
import Icon from '@material-ui/core/Icon';

const Todo = ({todo, deleteTodo, crossOffTodo}) => {


function handleDeleteTodo(){
    deleteTodo(todo.id)
}

function handleCrossOff(){
    crossOffTodo(todo.id)
}



    return(
        
            <TodoContainer>
                <li style={{textDecoration: todo.completed ? 'line-through' : null }} onClick={handleCrossOff}>{todo.task}</li>
                <Icon  onClick={handleDeleteTodo} >delete </Icon>
            </TodoContainer>
        
       
    )
}

const TodoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: .75rem;

    li{
        margin-right: .5em;
        list-style: none;
        text-transform: uppercase;
        font-family:'Roboto',sans-serif;
       cursor: pointer;
    }
    
`

export default Todo