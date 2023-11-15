import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  // fetch("https://randomuser.me/api/?results=2")
  // .then( (result) => {
  //   return result.json()
  // } )

  const [data, setData] = useState()

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=2`)
     .then((response) => { return response.json()})
     .then( (data) => {
      
     })
   }, []);
  
  
  return (
    <div className="App">
      <h1>Exercise</h1>


    </div>
  );
}

export default App;
