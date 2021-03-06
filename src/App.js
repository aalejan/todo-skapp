import { SkynetClient} from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { useEffect, useState} from 'react';
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import LoadDataButton from './components/LoadDataButton';
import styled from 'styled-components';
import Title from './components/Title';

const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

  const client = new SkynetClient(portal);
  const dataDomain = "localhost";

  const contentRecord = new ContentRecordDAC();

  
function App() {
  const[todos, setTodos] = useState([])
  const[saving, setSaving] = useState(null)
  const[loading, setLoading] = useState(null)
  const[jsonData, setJsonData] = useState({})
  const[mySky, setMySky] = useState()
  const[userID, setUserID] = useState()
  const [loggedIn, setLoggedIn] = useState(null)
  const[filePath, setFilePath] = useState()
  const[userMessage, setUserMessage] = useState('')

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
    setSaving(true);
    
if(Object.keys(jsonData).length === 0){
  setSaving(false)
  return console.log('No')
  
}else {
  try {
  
  await mySky.setJSON(filePath, jsonData);
  
   console.log(jsonData)
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
}

   
    setSaving(false)
  };

  const loadData = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Loading user data from SkyDB');

    const {data} = await mySky.getJSON(filePath)

    if (data){
      setTodos(data.todoList)
      console.log(data)
    }else{
      console.error('There was a problem with getJSON')
    }

    setLoading(false)
  }

  const addTodo = async(todo) => {

     setTodos([todo, ...todos]);
     setJsonData({todoList: [todo, ...todos]})
    
  }

  const crossOffTodo = (id) => {
   setTodos(
     todos.map(todo => {
       if(todo.id===id){
         return{
           ...todo,
           completed: !todo.completed
         };
       }
       return todo;
     })
   )
   setJsonData(
    {todoList : todos.map(todo => {
      if(todo.id===id){
        return{
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    })}
  )

  }

  const  deleteTodo = async(id) => {
     setTodos(todos.filter((todo) => {
      return todo.id !== id 
    }))

    setJsonData({todoList: todos.filter((todo) => {
          return todo.id !== id 
        })})

  }

  const renderedMessage = () => {
    if(!loggedIn){
      return ('You are not logged in.')
    } else if(loggedIn && saving){
      return ('Saving Data...')
    } else return ('You are currently logged in.')
  }
  

  return (
    <div className="App">
      <Title />
     
    <div className='main-content-container'>
    {
        loading ? 'LOADING...' : <TodoList crossOffTodo={crossOffTodo} todos={todos} deleteTodo={deleteTodo} />
      }
    <TodoForm addTodo={addTodo} />
     <Buttons>
        <LoginButton loggedIn={loggedIn} handleMySkyLogin={handleMySkyLogin}/>
        <LogoutButton loggedIn={loggedIn}  handleMySkyLogout={handleMySkyLogout}/>
        <button disabled={!loggedIn ? true : saving}  onClick={() =>  handleMySkyWrite(jsonData)}>
          Save Data 
        </button>
        <LoadDataButton loggedIn = {loggedIn} saving={saving} loadData={loadData} />
     </Buttons>
     <div>
       {renderedMessage()}
     </div>
     </div>
    </div>
  );
}



const Buttons = styled.div `
  button{
    display: inline-block;
    padding:0.5em 1.1em;
    ???margin:0 0.8em 0.3em 0;
    margin-top: .5em;
    border-radius:0.15em;
    border: none;
    ???background-color:#def1fb;
    ???box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
    ???text-align:center;
    ???position:relative;
    cursor:pointer;
    text-transform: uppercase;
   
  }

`



export default App;
