import React, { useState,useContext } from 'react'
import { userContext } from '../contexts/userContext'
import {Link,useNavigate} from 'react-router-dom'
function Login() {
  
  const loggedData = useContext(userContext); 

  const [message,setMessage] = useState({
    type:"",
    text:""
  })
  const [userCred,setUserCred] = useState({
    email:"",
    password:""
  })
  
  const navigate = useNavigate();

  function handeleInput(event){
    setUserCred((prevState)=>{
      return {...prevState,[event.target.name]:event.target.value};
    })
  }

  function handleSubmit(event){
    event.preventDefault();
      fetch('http://localhost:8000/login',{
        method:"POST",
        body:JSON.stringify(userCred),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then((response)=>{
       if(response.status===404){
          setMessage({type:"error",text:"username or email does not exists"})
       }
       else if(response.status===403){
           setMessage({type:"error",text:"iIncorrect password"})
       }
       else if(response.status===200){
        setMessage({type:"success",text:"Login successful"})
           return response.json()
       }

       setTimeout(()=>{
          setMessage({type:"invisible-msg",text:"Dummy text"})
       },5000)
      
    })
      .then((data)=>{
        if(data.token!==undefined){
          localStorage.setItem("nutrify-user",JSON.stringify(data))

          loggedData.setLoggedUser(data);
          navigate('/track')
        }
        
      })
      .catch((error)=>{
        console.log(error)
      })
    
  }


  return (
    <div>
        <section className='container'>
            <form className='form'>
              <h1>Login to Fit</h1>
              <input className='inp' type='email' required onChange={handeleInput}
              placeholder='enter your email' name='email' value={userCred.email}/>

              <input className='inp' type='password' required onChange={handeleInput} 
              placeholder='enter your password' maxLength={8} name='password' value={userCred.password}/>

              <button className='btn' onClick={handleSubmit}>Login</button>
              <p>Not Registered ?<Link to="/register"> Create an Account</Link></p>
              <p className={message.type}>{message.text}</p>
        </form>

    </section>  
    </div>
  )
}

export default Login
