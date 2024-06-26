import './App.css';
import {Routes,Route, BrowserRouter} from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Track from './components/Track';
import { userContext } from './contexts/userContext';
import { useState } from 'react';
import Private from './components/Private';
import Diet from './components/Diet';

function App() {

  const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")));


  return (
    <>
    <userContext.Provider value={{loggedUser,setLoggedUser}}>
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/track' element={<Private Component={Track}/>}/>
         <Route path='/diet' element={<Private Component={Diet}/>}/> 
         <Route path='*' element={<NotFound/>} />
      </Routes>
      </BrowserRouter>  
    </userContext.Provider>
   </> 
  );
}

export default App;
