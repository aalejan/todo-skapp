import { SkynetClient} from 'skynet-js';
import { useEffect, useState} from 'react';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import LoginButton from './components/LoginButton';

const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

  const client = new SkynetClient(portal);
  const dataDomain = "localhost";
  
function App() {
  const[todos, setTodos] = useState([])
  const[mySky, setMySky] = useState()
  const[userID, setUserID] = useState()
  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    
  
async function initMySky() {
  try {
    const mySky = await client.loadMySky(dataDomain);

    const loggedIn = await mySky.checkLogin();

   setMySky(mySky)

    if (loggedIn) {
    
      setUserID(await mySky.userID())
    }

  } catch (e) {
    console.error(e);
  }
}

// call async setup function
initMySky();

  }, []);

  const handleMySkyLogin = async () => {

    const status = await mySky.requestLoginAccess();

setLoggedIn(status);

if (status) {
  setUserID(await mySky.userID());
}
  };

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
     <LoginButton handleMySkyLogin={handleMySkyLogin}/>
    </div>
  );
}



export default App;
