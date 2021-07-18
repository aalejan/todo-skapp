import styled from "styled-components"

const Todo = ({todo, deleteTodo}) => {
function handleDeleteTodo(){
    deleteTodo(todo.id)
}

    return(
        
            <TodoContainer>
                <li>{todo.task}</li>
                <button onClick={handleDeleteTodo}>Delete</button> 
            </TodoContainer>
        
       
    )
}

const TodoContainer = styled.div`
display: flex;
justify-content: center;

    li{
        margin-right: .5em;
        list-style: none;
        text-transform: uppercase;
        font-family:'Roboto',sans-serif;
    }
    
`

export default Todo