import styled from "styled-components"
import Icon from '@material-ui/core/Icon';

const Todo = ({todo, deleteTodo}) => {
function handleDeleteTodo(){
    deleteTodo(todo.id)
}

    return(
        
            <TodoContainer>
                <li>{todo.task}</li>
                <Icon  onClick={handleDeleteTodo} >delete </Icon>
            </TodoContainer>
        
       
    )
}

const TodoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

    li{
        margin-right: .5em;
        list-style: none;
        text-transform: uppercase;
        font-family:'Roboto',sans-serif;
    }
    
`

export default Todo