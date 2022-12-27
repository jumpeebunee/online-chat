import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const MainPage = () => {

  const { isAuth } = useAuth();

  return (
    <div>
      {isAuth
      ? <h1>Добро пожаловать!</h1>
      : <Navigate to='/auth'/>
      }
    </div>
  )
}

export default MainPage