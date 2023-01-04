import '../styles/pages/mainPage.scss'
import '../styles/components/loadingApp.scss';
import '../styles/components/appNav.scss';
import LoadingPosts from '../components/LoadingPosts'
import AppHeader from '../components/AppHeader';
import { useLocation } from 'react-router-dom';

const LoadingPage = () => {

  const location = useLocation();
  console.log(location.pathname)

  return (
    <div className="app__content">
      <AppHeader/>
      <main className="main">
        <div className="container main__container">
          <div className='app-nav'>
            <ul className='app-nav__content'>
              <li className='app-loading__item'></li>
              <li className='app-loading__item'></li>
              <li className='app-loading__item'></li>
            </ul>
          </div>
          <div className="main-app">
            <section className='main-section'>
              <div className="main__container">
                <div className='main__content'>
                  <div className={`app-loading__content app-loading__${location.pathname.slice(1)}`}></div>
                  <LoadingPosts/>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoadingPage