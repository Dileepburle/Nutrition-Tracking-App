import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";

export default function Private(props){

    const loggedData = useContext(userContext)
    return(
        
         loggedData.loggedUser!==null?
         <props.Component/>
         :
         <Navigate to="/Login"/>
    )
}