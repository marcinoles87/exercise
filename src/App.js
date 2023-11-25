import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  // fetch("https://randomuser.me/api/?results=2")
  // .then( (result) => {
  //   return result.json()
  // } )

  let [data, setData] = useState(null);
  const [newTable , setTable] = useState();
  const [show , setShow] = useState(false);
  const [like , setLike] = useState(0);



  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=16`)
     .then((response) => { return response.json()})
     .then( (data) => {
        setData(data.results)
        console.log(data.results)
        setTable(data.results)
      
     })
   }, []);

   

   const handleOnchange = (e) => {
   
    const newData = [...data];
    const value = e.target.value;
    const filtered = newData.filter( ({name}) => name.last.includes(value) );

    if(e.target.value.length < 1){
      console.log(data)
      setTable(data) 
    }else(
     setTable(filtered)
    )
   }

   const handleOnchangeLocation = (e) => {

    const newData = [...data];
    const value = e.target.value;
    const filtered = newData.filter( ({location}) => location.country.includes(value) );

    if(e.target.value.length < 1){
      console.log(data)
      setTable(data) 
    }else(
     setTable(filtered)
    )
   }

   const handleShow = (e) => {
    
    setShow(!show)

   }

   const handleOnClick = (e) => {
  
    const element = e.target;
    console.log(element)
    element.classList.toggle('modal')
    
   }

   const handleDelete = (index , e) => {

   const deleted = newTable.splice(index , 1);
   const tableN = newTable.filter( (item) => item !==item[index] ) 

   setTable(tableN)
   if(tableN < 1){
    alert('last person ! delete from friend ?')
   }

   }

   const handleLike = ( e) => {
     console.log(e.target.index)
    
    
    setLike( like + 1)
   }

  
  
 
  return (
    <div className="App">
      <h1>Exercise</h1>
      <input placeholder='search by last name' onChange={handleOnchange}></input>
      <input placeholder='search by location' onChange={handleOnchangeLocation}></input>
      <div className='people-container'>
      {newTable && newTable.map( ({name , picture , location , id} , index) => {
        
        return(
          <>
          <div className='people-card'  key={index} >
              <img id='people-img' src={picture.large} alt={index} onClick={handleOnClick}></img>
              <i class="fa-regular fa-thumbs-up" index={index} onClick={handleLike}>{like}</i>
              <button onClick={handleShow}>Show detail</button>
              <button onClick={ () => handleDelete(index)}>Delete friend</button>

                {show ?  
                <div className='people-info'>

                  <p className='people-name'>{name.first} {name.last}</p>
                  <p>{location.country}</p> 
                </div> 
                : ''}
                </div>
                
           </>
         
        )
      })}
      </div>

    </div>
  );
}

export default App;
