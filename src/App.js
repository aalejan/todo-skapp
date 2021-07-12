import { useState, useRef} from 'react';

import Todo from './components/Todo'
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
  let textInput = useRef();
  const[todos, setTodos] = useState([])

  

  return (
    <div className="App">
     hello
    </div>
  );
}



export default App;
