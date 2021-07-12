import Todo from './Todo'
const TodoList = ({todos, deleteTodo}) => {

    return (
        <ul>
            {
                todos.map((todo) => {
                    return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo}/>
                })
            }
        </ul>
    )
}

export default TodoList