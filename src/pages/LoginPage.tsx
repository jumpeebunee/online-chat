import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser } from '../types/types';
import AppAuthSignin from '../components/AppAuthSignin';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const loginUser = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
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
      <AppAuthSignin
        setUserEmail={setUserEmail}
        setUserPassword={setUserPassword}
        userEmail={userEmail}
        userPassword={userPassword}
        createNewUser={loginUser}
      />
    </div>
  )
}

export default LoginPage