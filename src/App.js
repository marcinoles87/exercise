import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  let [data, setData] = useState(null);
  const [newTable , setTable] = useState();
  const [show , setShow] = useState(false);
  let [like , setLike] = useState();


  

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=16`)
     .then((response) => { return response.json()})
     .then( (data) => {
        setData(data.results)
        console.log(data.results[0])
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
    element.classList.toggle('modal')
    
   }

   const handleDelete = (index , e) => {

   newTable.splice(index , 1);
   const tableN = newTable.filter( (item) => item !==item[index] ) 

   setTable(tableN)
   if(tableN < 1){
    alert('last person ! delete from friend ?')
   }

   }

   const handleLike = (index) => {

    newTable.forEach(element => {
      element.like = 0
      
     });

    
    
     setTable( newTable.map( (item) => {
      console.log(index)
      console.log(item)
      console.log(item.id.value)
      if(item.index === index){
        return {
          ...item ,
          like : item.like + 1
        }
      }else{
        return item
      }
     }))


   }

  
  return (
    <div className="App">
      <h1>Exercise</h1>
      <input placeholder='search by last name' onChange={handleOnchange}></input>
      <input placeholder='search by location' onChange={handleOnchangeLocation}></input>
      <div className='people-container'>
      {newTable && newTable.map( ({name , picture , location  , likes } , index) => {
        
        return(
          <>
          <div className='people-card'  key={index} >
              <img id='people-img' src={picture.large} alt={index} onClick={handleOnClick}></img>
              <i className="fa-regular fa-thumbs-up" index={index}  onClick={() => handleLike(index)}>{like}</i>
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
