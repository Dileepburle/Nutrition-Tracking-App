import React, { useEffect, useState } from 'react';
import { userContext } from '../contexts/userContext';
import { useContext } from 'react';
import Header from './Header';

function Diet() {
     
    let loggedData = useContext(userContext);
    let [items,setItems] = useState([]);
    const [date,setDate] = useState(new Date());

    let [total,setTotal] = useState({
      totalCalories:0,
      totalEnergy:0,
      totalCarbs:0,
      totalProteins:0,
      totalFats:0
    })

    useEffect(()=>{
       fetch(`http://localhost:8000/track/${loggedData.loggedUser.userId}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${loggedData.loggedUser.token}`
        }
        })
        .then((response)=>response.json())
        .then((data)=>{
            setItems(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[date])

    useEffect(()=>{
      calculateTotal();
   },[items])

    function calculateTotal(){
      let totalCopy = {
              totalCalories:0,
              totalProteins:0,
              totalCarbs:0,
              totalFats:0,
              totalEnergy:0
           };

            items.forEach((item)=>{
              totalCopy.totalEnergy += item.details.energy
              totalCopy.totalCalories += item.details.calories
              totalCopy.totalProteins += item.details.proteins
              totalCopy.totalCarbs += item.details.carbohydrates
              totalCopy.totalFats += item.details.fats

            });
            setTotal(totalCopy)
    }


  


  return (
    <section className="container diet-container">

      <Header/>
      <input type='date' onChange={(event)=>{
        setDate(new Date(event.target.value))
      }} />
    {
      items.map((item)=>{
        return(
          <div className='item' key={item._id}>
            
            <h4>{item.foodId.name}({item.quantity}gm)</h4>
            <div className='item-details'>
            <p>Energy {item.details.energy}kj, 
              proteins {item.details.proteins}cl,
              Carbs {item.details.carbohydrates}cl,
              Calories {item.details.calories}cl,
              Fats {item.details.fats}cl
            </p>
            </div>
          </div>
        )
      })
    }
    <div className='item'>
            <h4>Total Diet</h4>
            <p>Energy {total.totalEnergy.toFixed(2)}kj,
              proteins {total.totalProteins.toFixed(2)}cl,
              Carbs {total.totalCarbs.toFixed(2)}cl,
              Calories {total.totalCalories.toFixed(2)}cl,
              Fats {total.totalFats.toFixed(2)}cl
            </p>
    </div>

    </section>
  )
}

export default Diet
