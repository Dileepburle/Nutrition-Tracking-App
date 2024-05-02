import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Register() {
   
  const [userDetails,setUserDetails] = useState({
    name:"",
    email:"",
    password:"",
    age:""
  })
  
  const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"dummy-text"
  })


  function handeleInput(event){
      setUserDetails((prevState)=>{
        return { ...prevState,[event.target.name]:event.target.value};
      })
      
  }
  function handleSubmit(event){
       event.preventDefault();
       console.log(userDetails)
       fetch('http://localhost:8000/register',{
        method:"POST",
        body:JSON.stringify(userDetails),
        headers:{
          "Content-Type":"application/json"
        }
       })
       .then((response)=>response.json())
       .then((data)=>{
            setMessage({type:'success',text:data.message})

            setUserDetails({
              name:"",
              email:"",
              password:"",
              age:""
            })

            setTimeout(()=>{
               setMessage({type:"invisible-msg",text:"dummy text" })
            },5000)
       })
       .catch((error)=>{
        console.log(error)
       })
  }

  return (

    
    <section className='container'>
        <form className='form'>
            <h1>Ready to Fit</h1>
            <input className='inp' type='text' required onChange={handeleInput}
            placeholder='enter your name' name='name' value={userDetails.name}/>

            <input className='inp' type='email' required onChange={handeleInput}
            placeholder='enter your email' name='email' value={userDetails.email} />

            <input className='inp' type='password' maxLength={8} required onChange={handeleInput}
            placeholder='enter your password' name='password' value={userDetails.password} />

            <input className='inp' type='number' min={12} max={100} onChange={handeleInput}
            placeholder='enter your age' name='age' value={userDetails.age} />

            <button className='btn' onClick={handleSubmit}>Register</button>
            <p>Already Registered ? <Link to="/login"> Please Login</Link></p>

            <p className={message.type}>{message.text}</p>
        </form>

    </section>
  )
}

export default Register
