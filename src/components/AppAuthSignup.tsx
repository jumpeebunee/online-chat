import { FC, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/AppAuthSign.scss';

interface AppAuthSignupProps {
  setUserEmail: Function,
  setUserPassword: Function,
  userEmail: string,
  userPassword: string,
  createNewUser: Function,
}

const AppAuthSignup:FC <AppAuthSignupProps> = ({setUserEmail, setUserPassword, userEmail, userPassword, createNewUser}) => {

  const createUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewUser();
  }

  return (
    <div className='login__card'>
      <div className='login__header'>
        <div className="login__logo">
        <svg className="login__logo-icon" width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="49" rx="10" fill="white"/>
          <path d="M9.15625 33V30.7969L16.9297 20.1406H9.16406V17H21.8203V19.2031L14.0469 29.8594H21.8125V33H9.15625ZM24.1855 33V17H28.0527V23.4219H34.3574V17H38.2168V33H34.3574V26.5703H28.0527V33H24.1855Z" fill="#222222"/>
        </svg>
        </div>
        <h2 className="login__heading">Регистрация Жигаловка</h2>
        <form onSubmit={(e) => createUser(e)} className='login__form'>
          <input 
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className='input'
            type="email"
            placeholder='Почта'
          />
          <input 
            onChange={(e) => setUserPassword(e.target.value)}
            autoComplete="true"
            value={userPassword}
            style={{marginTop: '10px'}}
            className='input'
            type="password"
            placeholder='Пароль'
          />
        </form>
        <button className='btn login__btn'>Зарегистрироваться</button>
        <span className='login__or'>или</span>
        <Link to='/login' className='btn register-btn'>Вход</Link>
      </div>
    </div>
  )
}

export default AppAuthSignup