import '../../styles/components/AppAuthSign.scss';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import AppAuthInput from '../AppAuthInput';
import { ILogin } from '../../types/types';

interface AppAuthSigninProps {
  userData: ILogin,
  setUserData: Function,
  createNewUser: Function,
}

const AppAuthSignin:FC<AppAuthSigninProps> = ({userData, setUserData, createNewUser}) => {

  const [isErrors, setIsErrors] = useState({email: false, password: false});

  const loginToProfile = () => {
    const isValid = validateUserInfo();
    if (isValid) createNewUser();
  }

  const validateUserInfo = () => {
    const isEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,3}$/.test((userData.email.trim()));
    const isPassword = userData.password.length >= 6;

    setIsErrors({email: !isEmail, password: !isPassword});
    return isEmail && isPassword;
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
        <h2 className="login__heading">Вход Жигаловка</h2>
        <form className='login__form'>
          <AppAuthInput
            type={'email'}
            title={'Почта'}
            isError={isErrors.email}
            setValue={setUserData}
            value={userData}
            currentKey={'email'}
            errorMessage={'Введите корректную почту'}
          />
          <AppAuthInput
            type={'password'}
            title={'Пароль'}
            isError={isErrors.password}
            setValue={setUserData}
            value={userData}
            currentKey={'password'}
            errorMessage={'Введите корректный пароль'}
          />
        </form>
        <button onClick={() => loginToProfile()} className='btn login__btn'>Войти</button>
        <span className='login__or'>или</span>
        <Link to='/auth' className='btn register-btn'>Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default AppAuthSignin