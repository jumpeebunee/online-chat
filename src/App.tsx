import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setUser } from './app/feautures/userSlice';
import AppNavigation from "./components/AppNavigation"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          email: user.email,
          accessToken: user.uid,
          id:  user.refreshToken,
        }
        navigate('/')
        dispatch(setUser(data));
      } else {
        navigate('/login');
      }
    });
  }, [])

  return (
    <main className="main">
      <AppNavigation/>
    </main>
  )
}

export default App