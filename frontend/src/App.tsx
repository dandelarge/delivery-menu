import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function getMessage () {
  return
}

function App() {
  const [servertext, setServertext] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3012/').then( res => setServertext(res.data));
  }, [])

  return (
    <div className="App">
      <h1>{servertext}</h1>
    </div>
  );
}

export default App;
