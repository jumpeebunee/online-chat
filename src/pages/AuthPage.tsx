import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';

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
    <div className='container login__container'>
      <AppAuthSignup
        setUserEmail={setUserEmail}
        setUserPassword={setUserPassword}
        userEmail={userEmail}
        userPassword={userPassword}
        createNewUser={createNewUser}
      />
    </div>
  )
}

export default AuthPage