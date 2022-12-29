import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/AppAuthSign.scss';

interface AppAuthSignupProps {
  setUserEmail: Function,
  setUserPassword: Function,
  userEmail: string,
  userPassword: string,
  createNewUser: Function,
  userInfo: {firstName: string, lastName: string}
  setUserInfo: Function,
  userData: {email: string, password: string},
  setUserData: Function,
}

const AppAuthSignup:FC <AppAuthSignupProps> = ({setUserEmail, setUserPassword, userEmail, userPassword, createNewUser, userInfo, setUserInfo, userData, setUserData}) => {

  const [isErrors, setIsErrors] = useState({firstName: false, lastName: false});

  const createUser = () => {
    const isValid = validateUserInfo();
    if (userData.email && userData.password && isValid) {
      createNewUser();
    }
  }

  const validateUserInfo = () => {
    const isFirstName = /^[а-яА-ЯёЁa-zA-Z]+$/.test(userInfo.firstName.trim());
    const isLastName = /^[а-яА-ЯёЁa-zA-Z]+$/.test(userInfo.lastName.trim());

    setIsErrors({firstName: !isFirstName, lastName: !isLastName});
    return isFirstName && isLastName;
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
        <form className='login__form'>
          <div>
            <input
              className={isErrors.firstName ? 'input input_error' : 'input'}
              type="text"
              placeholder='Имя'
              onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
            />
            {isErrors.firstName && <label className='login__label'>Введите корректное имя</label>}
          </div>
          <div>
            <input 
               className={isErrors.lastName ? 'input input_error' : 'input'}
              type="text"
              placeholder='Фамилия'
              onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
            />
            {isErrors.lastName && <label className='login__label'>Введите корректную фамилию</label>}
          </div>
          <input 
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            value={userData.email}
            className='input'
            type="email"
            placeholder='Почта'
          />
          <input 
            onChange={(e) =>  setUserData({...userData, password: e.target.value})}
            autoComplete="true"
            value={userData.password}
            className='input'
            type="password"
            placeholder='Пароль'
          />
        </form>
        <button onClick={() => createUser()} className='btn login__btn'>Зарегистрироваться</button>
        <span className='login__or'>или</span>
        <Link to='/login' className='btn register-btn'>Вход</Link>
      </div>
    </div>
  )
}

export default AppAuthSignup