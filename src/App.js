import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  const test = [
    {
      id:1 ,
      counter : 0 ,
      name: 'a'
    },

    {
      id:2 ,
      counter : 0,
      name : 'b'
    },

    {
      id:3 ,
      counter : 0,
      name : 'c'
    }

   ]

   

   useEffect(() => {
    fetch(`https://randomuser.me/api/?results=10`)
     .then((response) => { return response.json()})
     .then( (data) => {
        setData(data.results)
        console.log(data.results[0])
        setTable(data.results)
        
     })
   }, []);


  let [data, setData] = useState(null);
  const [newTable , setTable] = useState();
  const [show , setShow] = useState(false);
  const [newVal , setNewvalue] = useState(true);


   const handleOnchange = (e) => {
   
    const newData = [...data];
    const value = e.target.value;
    const filtered = newData.filter( ({name}) => name.last.includes(value) );

    if(e.target.value.length < 1){
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

    if(newVal){
      newTable.forEach(element => {
        element.countLike = 0
        element.countUnlike = 0
         }  )
        setNewvalue(false)
    }



    setTable( newTable.map( (item,i) => {

     
      if(i === index){
        return{
          ...item,
          countLike : item.countLike + 1
        }
      }else{
        return item
      }
    }) )

    }

    const handleUnLike = (index) => {

      if(newVal){
        newTable.forEach(element => {
          element.countLike = 0 
          element.countUnlike = 0
           }  )
          setNewvalue(false)
      }

      setTable( newTable.map( (item,i) => {
  
       
        if(i === index){
          return{
            ...item,
            countUnlike : item.countUnlike +1
          }
        }else{
          return item
        }
      }) )
  
      }
    

  return (
    <div className="App">
      <h1>Exercise</h1>


      <input placeholder='search by last name' onChange={handleOnchange}></input>
      <input placeholder='search by location' onChange={handleOnchangeLocation}></input>
      <div className='people-container'>
      {newTable && newTable.map( ( {name , picture , location  , countLike , countUnlike }  , index) => {

      
        
                
        return(
          <>
          <div className='people-card'  key={index} >
              <img id='people-img' src={picture.large} alt={index} onClick={handleOnClick}></img>
              <button onClick={handleShow}>Show detail</button>
              <button onClick={ () => handleDelete(index)}>Delete friend</button>

                {show ?  
                <div className='people-info'>

                  <p className='people-name'>{name.first} {name.last}</p>
                  <p>{location.country}</p> 
                  <i className="fa-regular fa-thumbs-up icon-blue" index={index}  onClick={() => handleLike(index)}>{countLike}</i>  
              <i className="fa-regular fa-thumbs-down icon-red" index={index}  onClick={() => handleUnLike(index)}>{ countUnlike}</i> 
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
