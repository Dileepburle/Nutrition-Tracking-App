import React, { useEffect, useState } from 'react'
import { userContext } from '../contexts/userContext'
import { useContext } from 'react'

function Food(props) {

  const [eatenQuantity,setEatenQuantity] = useState(100)
  const [food,setFood] = useState({})
  const [foodInitial,setFoodInitial] = useState({})

  let loggedData = useContext(userContext)
  

  useEffect(()=>{
   setFood(props.food)
   setFoodInitial(props.food)
   console.log(loggedData)
  },[props.food])


 //if you want tochange image means just change the imageUrl in the database
 function calculateMacros(event){
         
      if(event.target.value!==0){
         let quantity = Number(event.target.value);
         let copyFood = {...food};

         setEatenQuantity(quantity)
         copyFood.calories = (foodInitial.calories*quantity)/100;
         copyFood.energy = (foodInitial.energy*quantity)/100;
         copyFood.fats = (foodInitial.fats*quantity)/100;
         copyFood.carbohydrates = (foodInitial.carbohydrates*quantity)/100;
         copyFood.proteins = (foodInitial.proteins*quantity)/100;
         setFood(copyFood)
      }
   
 }

 function trackFoodItem(){
   let trackedItem = {
      userId:loggedData.loggedUser.userId,
      foodId:food._id,
      details:{
        calories:food.calories,
        energy:food.energy,
        proteins:food.proteins,
        carbohydrates:food.carbohydrates,
        fats:food.fats,
      },
      quantity:eatenQuantity,
   }
   console.log(trackedItem)

   fetch('http://localhost:8000/track',{
      method:"POST",
      body:JSON.stringify(trackedItem),
      headers:{
         "Authorization":`Bearer ${loggedData.loggedUser.token}`,
         "Content-Type":"application/json"
      }
   })
   .then((response)=>response.json())
   .then((data)=>{
      console.log(data)
   })
   .catch((err)=>{
      console.log(err)
   })
 }

  return (
    <div className='food'>
          
         
          <div className='food-img'>
             <img className='food-image' src={food.imageUrl}  />
          </div>
          <h2>{food.name}({eatenQuantity}gms)</h2>
            <div className='nutrient'>
               <p className='n-title'>Energy</p>
               <p className='n-value'>{food.energy}kj</p>
            </div>
            <div className='nutrient'>
               <p className='n-title'>Calories(cl)</p>
               <p className='n-value'>{food.calories}</p>
            </div>
            <div className='nutrient'>
               <p className='n-title'>Carbs</p>
               <p className='n-value'>{food.carbohydrates}</p>
            </div>
            <div className='nutrient'>
               <p className='n-title'>Fats</p>
               <p className='n-value'>{food.fats}</p>
            </div>
            <div className='nutrient'>
               <p className='n-title'>Proteins</p>
               <p className='n-value'>{food.proteins}</p>
            </div>
            <div className='nutrient'>
               <p className='n-title'>Fiber</p>
               <p className='n-value'>230</p>
            </div>
            
            <div className='track-control'>
               <input type='number' onChange={calculateMacros}  className='inp' 
               placeholder='quantity in gms' />
               <button  className='btn' onClick={trackFoodItem}>Track</button>
            </div>
          </div>

  )
}

export default Food
