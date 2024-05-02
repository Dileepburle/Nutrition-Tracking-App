import React, { useState } from 'react'
import { useContext } from 'react'
import { userContext } from '../contexts/userContext'
import Food from './Food';
import Header from './Header';

function Track() {

  const loggedData = useContext(userContext);
  const [foodItems,setfoodItems] = useState([]);
  const [food,setFood] = useState(null);



  function searchFood(event){
    
     if(event.target.value!==""){

     fetch(`http://localhost:8000/foods/${event.target.value}`,
     {
      method:"GET",
      headers:{
        "Authorization":"Bearer "+loggedData.loggedUser.token
      }
     }
     
    )
     .then((response)=>response.json())
     .then((data)=>{

        if(data.message === undefined){
          setfoodItems(data)
        }
        else{
          setfoodItems([])
        }
        
     })
    .catch((err)=>{
      console.log(err)
    })
  }
  else{
    setfoodItems([]);
  }
  }


  return (
    <>
  
      <section className=' track-container'>
        <Header/>
        <div className='search'>
          <input type='text' className='search-inp' 
          onChange={searchFood} placeholder='Search Food Item' />
          {
            foodItems.length!==0?(
              <div className='search-results'>
            {
               foodItems.map((item)=>{
                 return(
                   <p className='item' onClick={()=>{
                    setFood(item)
                   }} key={item._id} >{item.name}</p>
                 )
               })
            }
          </div>
            ):null
          }
          
        </div>

        {
          food!==null?(<Food food={food}/>)
          :null
        }

        
      </section>
      </>

  )
}

export default Track
