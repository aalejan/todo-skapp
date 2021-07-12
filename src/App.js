import { useEffect, useState} from 'react';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';


// Import the SkynetClient and a helper
// import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';

// // We'll define a portal to allow for developing on localhost.
// // When hosted on a skynet portal, SkynetClient doesn't need any arguments.
// const portal =
//   window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
//   const client = new SkynetClient(portal);

//   const { publicKey } = genKeyPairFromSeed();
//   const { privateKey } = genKeyPairFromSeed();

//   const dataKey = "todos";


// Initiate the SkynetClient


function App() {
  
  const[todos, setTodos] = useState([])

  useEffect(() => {

  },[])

  function addTodo(todo){
    setTodos([todo, ...todos]);
  }

  function deleteTodo(id){
    setTodos(todos.filter((todo) => {
      return todo.id !== id 
    }))
  }
  

  return (
    <div className="App">
     <TodoForm addTodo={addTodo} />
     <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}



export default App;
