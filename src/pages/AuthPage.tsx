import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser } from '../types/types';

const AuthPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const createNewUser = async () => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData: IUser = {
        email: user.email,
        id: user.uid,
        accessToken: user.refreshToken,
      }
      dispatch(setUser(userData));
      navigate('/');
    })
    .catch((error) => { 
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
  }

  return (
    <div>
      <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} className='input' placeholder='Введите вашу почту'/>
      <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} className='input' placeholder='Введите пароль'/>
      <button onClick={createNewUser}>Зарегистрироваться</button>
      <Link to="/login">Войти</Link>
    </div>
  )
}

export default AuthPage