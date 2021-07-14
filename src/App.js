import { SkynetClient} from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { useEffect, useState} from 'react';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

  const client = new SkynetClient(portal);
  const dataDomain = "localhost";

  const contentRecord = new ContentRecordDAC();

  
function App() {
  const[todos, setTodos] = useState([])
  const[mySky, setMySky] = useState()
  const[userID, setUserID] = useState()
  const [loggedIn, setLoggedIn] = useState(null)
  const[filePath, setFilePath] = useState()

  useEffect(() => {
    setFilePath(dataDomain + '/' + userID);

  }, [userID]);


  useEffect(() => {
    
  
async function initMySky() {
  try {
    const mySky = await client.loadMySky(dataDomain);

    const loggedIn = await mySky.checkLogin();

   setMySky(mySky)

    if (loggedIn) {
    
      setUserID(await mySky.userID())
      console.log('logged in')
    }
   

  } catch (e) {
    console.error(e);
  }
}

// call async setup function
initMySky();

  }, []);

  const handleMySkyLogin = async () => {
console.log('logging in')
    const status = await mySky.requestLoginAccess();

setLoggedIn(status);

if (status) {
  setUserID(await mySky.userID());
}
  };

  const handleMySkyLogout = async () => {
    console.log('logging out')
  await mySky.logout();

  setLoggedIn(false);
  setUserID('');
  
  };

 

  const handleMySkyWrite = async (jsonData) => {
    
try {
  console.log('userID', userID);
  console.log('filePath', filePath);
  await mySky.setJSON(filePath, jsonData);
  await console.log(jsonData)
} catch (error) {
  console.log(`error with setJSON: ${error.message}`);
}

    try {
      await contentRecord.recordNewContent({
        todos: jsonData.todoList,
      });
    } catch (error) {
      console.log(`error with CR DAC: ${error.message}`);
    }
   
  };

  const addTodo = async(todo) => {

    await setTodos([todo, ...todos]);
     const jsonData = {
      todoList: [todo, ...todos]
    };

    await handleMySkyWrite(jsonData);
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
     <LogoutButton handleMySkyLogout={handleMySkyLogout}/>
    </div>
  );
}



export default App;
