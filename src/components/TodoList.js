import Todo from './Todo'
import styled from 'styled-components'

const TodoList = ({todos, deleteTodo, crossOffTodo}) => {

    return (
        <ListContainer>
             <ul>
                {
                    todos.map((todo) => {
                    
                        return <Todo crossOffTodo={crossOffTodo} key={todo.id} todo={todo} deleteTodo={deleteTodo}/>
                    })
                }
            </ul>
        </ListContainer>
       
    )
}

const ListContainer = styled.div`
    display: flex;
    justify-content: center;
    color: black;
    margin-bottom: 1rem;
    ul{
        width: 100%;
    }
`


export default TodoList