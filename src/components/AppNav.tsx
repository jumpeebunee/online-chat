import '../styles/components/appNav.scss';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const AppNav = () => {

  const location = useLocation();

  const pages = [
    {
      path: '/',
      title: 'Home',
      icon: '../home.svg'
    },
    // {
    //   path: '/profile',
    //   title: 'Profile',
    //   icon: '../profile.svg'
    // },
    {
      path: '/messages',
      title: 'Messages',
      icon: '../messages.svg'
    },
  ];

  return (
    <div className="app-nav">
      <ul className='app-nav__content'>
        {pages.map(page => 
          <li key={page.path} className={location.pathname === page.path ? 'app-nav__item app-nav__item_active' : 'app-nav__item'}>
            <Link to={page.path}>
              <span style={{backgroundImage: `url(${page.icon})`}} className='app-nav__item-icon'></span>
              {page.title}
            </Link>
          </li>
        )}
    </ul>
    <ul className="app-nav__m-content">
      {pages.map(page => 
        <li key={page.path} className={location.pathname === page.path ? 'app-nav__item app-nav__item_active' : 'app-nav__item'}>
          <Link to={page.path}>
            <span style={{backgroundImage: `url(${page.icon})`}} className='app-nav__item-icon'></span>
          </Link>
        </li>
      )}
      </ul>
    </div>
  )
}

export default AppNav