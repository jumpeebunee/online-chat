import { FC, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/appAuthSign.scss';
import { IUserData } from '../types/types';
import AppAuthInput from './AppAuthInput';

interface AppAuthSignupProps {
  createNewUser: Function,
  userData: IUserData,
  setUserData: Function,
  serverError: string,
  isLoading: Boolean,
}

type IErrors = {
  firstName: boolean,
  lastName: boolean,
  email: boolean,
  password: boolean,
}

const AppAuthSignup:FC <AppAuthSignupProps> = ({createNewUser, userData, setUserData, serverError, isLoading}) => {

  const [isErrors, setIsErrors] = useState<IErrors>({firstName: false, lastName: false, email: false, password: false});

  const createUser = () => {
    const isValid = validateUserInfo();
    if (isValid) createNewUser();
  }

  const validateUserInfo = () => {
    const isFirstName = /^[а-яА-ЯёЁa-zA-Z]+$/.test(userData.firstName.trim());
    const isLastName = /^[а-яА-ЯёЁa-zA-Z]+$/.test(userData.lastName.trim());
    const isEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,3}$/.test((userData.email.trim()));
    const isPassword = userData.password.length >= 6;

    setIsErrors({firstName: !isFirstName, lastName: !isLastName, email: !isEmail, password: !isPassword});
    return isFirstName && isLastName && isEmail && isPassword;
  }

  function testik(e: FormEvent<HTMLInputElement>) {
    let file = (e.target as HTMLInputElement);
    if (file.files) {
      setUserData({...userData, image: file.files[0]});
    }
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
        <h2 className="login__heading">Sign up Zhigalovka</h2>
        <form className='login__form'>
          <AppAuthInput
            type={'text'}
            title={'Firstname'}
            isError={isErrors.firstName}
            setValue={setUserData}
            value={userData}
            currentKey={'firstName'}
            errorMessage={'Enter a valid firstname'}
          />
          <AppAuthInput
            type={'text'}
            title={'Lastname'}
            isError={isErrors.lastName}
            setValue={setUserData}
            value={userData}
            currentKey={'lastName'}
            errorMessage={'Enter a valid lastname'}
          />
          <AppAuthInput
            type={'email'}
            title={'Email'}
            isError={isErrors.email}
            setValue={setUserData}
            value={userData}
            currentKey={'email'}
            errorMessage={'Enter a valid email'}
          />
          <AppAuthInput
            type={'password'}
            title={'Password'}
            isError={isErrors.password}
            setValue={setUserData}
            value={userData}
            currentKey={'password'}
            errorMessage={'Enter a valid password'}
          />
          <input onChange={(e) => testik(e)} type="file" accept="image/png, image/gif, image/jpeg"/>
        </form>
        <button disabled={isLoading ? true : false} onClick={() => createUser()} className='btn login__btn'>Sign up</button>
        {serverError && <label className='login__label'>{serverError}</label>}
        <span className='login__or'>or</span>
        <Link to='/login' className='btn register-btn'>Sign in</Link>
      </div>
    </div>
  )
}

export default AppAuthSignup