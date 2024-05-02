import { useContext } from "react"
import { userContext } from "../contexts/userContext"
import { useNavigate,Link } from "react-router-dom"

export default function Header() {
    
    const loggedData = useContext(userContext);
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("nutrify-user")
        loggedData.setLoggedUser(null);
        navigate('/login')
    }
  return (
    <div className="header-elements">
      <ul>
        <Link to='/track'><li>Track</li></Link>
        <Link to="/diet"><li>Diet</li></Link>
        <li onClick={logout}>LogOut</li>
      </ul>
    </div>
  )
}

