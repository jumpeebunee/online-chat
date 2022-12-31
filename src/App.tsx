import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setUser } from './app/feautures/userSlice';
import AppNavigation from "./components/AppNavigation"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppHeader from "./components/AppHeader";
import AppNav from "./components/AppNav";

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      <div>
        <AppHeader/>
        <main className="main">
          <div className="container main__container">
            {location.pathname !== '/login' && location.pathname !== '/auth'
            ? 
            <AppNav/>
            : ''
            }
            <section className="main-section">
              <AppNavigation/>
            </section>
          </div>
        </main>
      </div>
      : 
      <main className="main">
      </main>
      }
    </div>
  )
}

export default App