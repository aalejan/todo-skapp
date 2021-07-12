
const Todo = ({todo, deleteTodo}) => {
function handleDeleteTodo(){
    deleteTodo(todo.id)
}

    return(
        <div>
           <li>{todo.task}</li>
            <button onClick={handleDeleteTodo}>Delete</button> 
        </div>
    )
}

export default Todo