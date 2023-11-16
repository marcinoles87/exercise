import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  // fetch("https://randomuser.me/api/?results=2")
  // .then( (result) => {
  //   return result.json()
  // } )

  const [data, setData] = useState(null)



  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=2`)
     .then((response) => { return response.json()})
     .then( (data) => {
        setData(data.results)
        console.log(data.results)
      
     })
   }, []);
  
  console.log(data)
  return (
    <div className="App">
      <h1>Exercise</h1>
      {data && data.map( ({gender , email , picture} , index) => {
        return(
          <>
          <p key={index}> {gender} email : {email}</p>
         
          <img src={picture.large} alt={index}></img>
          </>
        )
      })}

    </div>
  );
}

export default App;
