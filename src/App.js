import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  // fetch("https://randomuser.me/api/?results=2")
  // .then( (result) => {
  //   return result.json()
  // } )

  let [data, setData] = useState(null)



  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=10`)
     .then((response) => { return response.json()})
     .then( (data) => {
        setData(data.results)
        console.log(data.results)
      
     })
   }, []);

   const handleOnchange = (e) => {

    const newData = [...data]
    if(e.target.value.length < 1){
      setData(newData)
      console.log('powrot do tablicy orginalnej')
      setData(data)
    }
    
    const value = e.target.value
    const filtered = newData.filter( ({email}) => email.includes(value) )
    console.log(filtered)
     setData(filtered)
   }
  
  console.log(data)
  return (
    <div className="App">
      <h1>Exercise</h1>
      <input placeholder='search friend' onChange={handleOnchange}></input>
      <div className='people-container'>
      {data && data.map( ({gender , email , picture , location , id} , index) => {
        return(
          <>
          <div className='people-card'  key={index}>
              <img src={picture.large} alt={index}></img>
              <p>name : {id.name}</p>
              <p> gender : {gender} </p>
              <p> email : {email}</p>
              <p> location : {location.country}</p>
           </div>
           </>
         
        )
      })}
      </div>

    </div>
  );
}

export default App;
