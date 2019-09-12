import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function askServer(callback, name = '') {
  let post
  if(name) {
    post = {
      method: 'POST',
      body: JSON.stringify({name}),
      headers: {'Content-Type': 'application/json'}
    }
  }
  fetch('/greet', post).then(async res => callback(await res.text()))
}

function App() {
  const [greeting, setGreeting] = useState('')
  const [name, setName] = useState('')
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => askServer(setGreeting)}>See what server says</button>
        {greeting ? <p>{greeting}</p> : null}
        <div>
          <input onBlur={(e) => setName(e.target.value)}/>
          <button onClick={() => askServer(setGreeting, name)}>Tell server name</button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
