import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './app/feautures/userSlice';
import AppNavigation from "./components/AppNavigation"

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = localStorage.getItem('userInfo');
    if (getData) {
      dispatch(setUser(JSON.parse(getData)));
      navigate('/');
    }
  },[])

  return (
    <main className="main">
      <AppNavigation/>
    </main>
  )
}

export default App