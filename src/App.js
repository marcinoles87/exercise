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
    fetch(`https://randomuser.me/api/?results=16`)
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
  let [count , setCount] = useState(0);
  let [counter , setCounter] = useState(test)


  
  
   const handleCounter = (id) => {
    setCounter(  counter.map( (item) => {
      if(item.id === id){
        return{
          ...item,
          counter : item.counter +1
        }
      }else{
        return item
      }
    })
    
      
    )

   }
   


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
      element.count = 0
      
    });

    // if(name.last.length > 2){
    //   newTable.forEach( (element , i) => {
    //     console.log(i)
    //     element.count = name.last.length
    //   })
    // }


    newTable.map( (item , i )=> {
    
      console.log(index)
      console.log(i)
      if(i === index){
        alert('wybrano to samo')
        return{
          ...item,
          name : 'ssss' ,
          count : 2        
        }

        

      }else{ return (item)
      }

      
    })

  }
      
  
   


  
  return (
    <div className="App">
      <h1>Exercise</h1>

      {counter.map( (item) => {
        return(
          <li key={item.id}>
            {item.name} {' '}
            {item.counter}
            <button onClick={ () => {handleCounter(item.id) }}>+</button>
          </li>
        )
      })}

      <input placeholder='search by last name' onChange={handleOnchange}></input>
      <input placeholder='search by location' onChange={handleOnchangeLocation}></input>
      <div className='people-container'>
      {newTable && newTable.map( ( {name , picture , location , like   }  , index) => {
                
        return(
          <>
          <div className='people-card'  key={index} >
              <img id='people-img' src={picture.large} alt={index} onClick={handleOnClick}></img>
              <i className="fa-regular fa-thumbs-up" index={index}  onClick={() => handleLike(index)}>{count}</i>
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
