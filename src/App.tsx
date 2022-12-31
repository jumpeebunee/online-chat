import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { setUser } from './app/feautures/userSlice';
import AppNavigation from "./components/AppNavigation"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppHeader from "./components/AppHeader";

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
            <div className="app-nav">
              <ul className='app-nav__content'>
                <li className={location.pathname === '/' ? 'app-nav__item app-nav__item_active' : 'app-nav__item'}>
                  <Link to="/">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 18C1.45 18 0.979333 17.7987 0.588 17.3962C0.196 16.993 0 16.5086 0 15.9429V6.68571C0 6.36 0.0709998 6.05143 0.213 5.76C0.354333 5.46857 0.55 5.22857 0.8 5.04L6.8 0.411429C6.98333 0.274286 7.175 0.171428 7.375 0.102857C7.575 0.0342856 7.78333 0 8 0C8.21667 0 8.425 0.0342856 8.625 0.102857C8.825 0.171428 9.01667 0.274286 9.2 0.411429L15.2 5.04C15.45 5.22857 15.646 5.46857 15.788 5.76C15.9293 6.05143 16 6.36 16 6.68571V15.9429C16 16.5086 15.8043 16.993 15.413 17.3962C15.021 17.7987 14.55 18 14 18H10V10.8H6V18H2Z" fill="#7190E6"/>
                    </svg>
                    Главная
                  </Link>
                </li>
                <li className={location.pathname === '/profile' ? 'app-nav__item app-nav__item_active' : 'app-nav__item'}>
                  <Link to="profile">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.2222 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V1.77778C16 0.8 15.2 0 14.2222 0ZM8 2.66667C9.71556 2.66667 11.1111 4.06222 11.1111 5.77778C11.1111 7.49333 9.71556 8.88889 8 8.88889C6.28444 8.88889 4.88889 7.49333 4.88889 5.77778C4.88889 4.06222 6.28444 2.66667 8 2.66667ZM14.2222 14.2222H1.77778V14.0178C1.77778 13.4667 2.02667 12.9511 2.45333 12.6133C3.97333 11.3956 5.90222 10.6667 8 10.6667C10.0978 10.6667 12.0267 11.3956 13.5467 12.6133C13.9733 12.9511 14.2222 13.4756 14.2222 14.0178V14.2222V14.2222Z" fill="#7190E6"/>
                    </svg>
                    Профиль
                  </Link>
                </li>
            </ul>
            <ul className="app-nav__m">
              <li className="app-nav__item">
                <Link to="/">
                  <svg className="app-nav__icon" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18C1.45 18 0.979333 17.7987 0.588 17.3962C0.196 16.993 0 16.5086 0 15.9429V6.68571C0 6.36 0.0709998 6.05143 0.213 5.76C0.354333 5.46857 0.55 5.22857 0.8 5.04L6.8 0.411429C6.98333 0.274286 7.175 0.171428 7.375 0.102857C7.575 0.0342856 7.78333 0 8 0C8.21667 0 8.425 0.0342856 8.625 0.102857C8.825 0.171428 9.01667 0.274286 9.2 0.411429L15.2 5.04C15.45 5.22857 15.646 5.46857 15.788 5.76C15.9293 6.05143 16 6.36 16 6.68571V15.9429C16 16.5086 15.8043 16.993 15.413 17.3962C15.021 17.7987 14.55 18 14 18H10V10.8H6V18H2Z" fill="#7190E6"/>
                  </svg>
                </Link>
              </li>
              <li className="app-nav__item">
                  <Link to="profile">
                    <svg className="app-nav__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.2222 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V1.77778C16 0.8 15.2 0 14.2222 0ZM8 2.66667C9.71556 2.66667 11.1111 4.06222 11.1111 5.77778C11.1111 7.49333 9.71556 8.88889 8 8.88889C6.28444 8.88889 4.88889 7.49333 4.88889 5.77778C4.88889 4.06222 6.28444 2.66667 8 2.66667ZM14.2222 14.2222H1.77778V14.0178C1.77778 13.4667 2.02667 12.9511 2.45333 12.6133C3.97333 11.3956 5.90222 10.6667 8 10.6667C10.0978 10.6667 12.0267 11.3956 13.5467 12.6133C13.9733 12.9511 14.2222 13.4756 14.2222 14.0178V14.2222V14.2222Z" fill="#7190E6"/>
                    </svg>
                  </Link>
                </li>
            </ul>
            </div>
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