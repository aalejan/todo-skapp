import { SkynetClient} from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { useEffect, useState} from 'react';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import LoadDataButton from './components/LoadDataButton';

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

    await mySky.loadDacs(contentRecord);


    const loggedIn = await mySky.checkLogin();

   setMySky(mySky)
    setLoggedIn(loggedIn)
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

  const loadData = async (e) => {
    e.preventDefault();
    console.log('Loading user data from SkyDB');

    const {data} = await mySky.getJSON(filePath)

    if (data){
      setTodos(data.todoList)
      console.log(data)
    }else{
      console.error('There was a problem with getJSON')
    }
  }

  const addTodo = async(todo) => {

     setTodos([todo, ...todos]);
     const jsonData = {
      todoList: [todo, ...todos]
    };

    await handleMySkyWrite(jsonData);
  }

  const  deleteTodo = async(id) => {
     setTodos(todos.filter((todo) => {
      return todo.id !== id 
    }))

    const jsonData = {
      todoList: todos.filter((todo) => {
        return todo.id !== id 
      })
    };

    await handleMySkyWrite(jsonData);

  }
  

  return (
    <div className="App">
     <TodoForm addTodo={addTodo} />
     <TodoList todos={todos} deleteTodo={deleteTodo} />
     <LoginButton handleMySkyLogin={handleMySkyLogin}/>
     <LogoutButton handleMySkyLogout={handleMySkyLogout}/>
     <LoadDataButton loadData={loadData} />
     <div>
       You are {loggedIn ? `currently` : `not`} logged in.
     </div>
    </div>
  );
}



export default App;
