import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './app/feautures/userSlice';
import AppNavigation from "./components/AppNavigation"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          email: user.email,
          accessToken: user.uid,
          name: user.displayName,
          id:  user.refreshToken,
          photoURL: user.photoURL,
        }
        navigate('/')
        dispatch(setUser(data));
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    });
  }, [])

  return (
    <div>
      {!isLoading
      ?
      <main className="main">
        <AppNavigation/>
      </main>
      : 
      <main className="main">
      </main>
      }
    </div>
  )
}

export default App