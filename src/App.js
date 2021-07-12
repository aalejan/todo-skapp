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
  return (
    <div className="App">
      <ul>
        <Todo input= 'input'/>
      </ul>
      <form>
        <label htmlFor="todo-input"></label>
        <input type="text" className="todo-input" />
        <button type="submit"></button>
      </form>
    </div>
  );
}

export default App;
