import { Navigate } from "react-router-dom";

const MainPage = () => {

  const user = true;

  return (
    <div>
      {user && <Navigate to='/auth'/>}
    </div>
  )
}

export default MainPage