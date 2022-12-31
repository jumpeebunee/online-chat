import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser } from '../types/types';
import AppAuthSignin from '../components/AppAuthSignIn/AppAuthSignin';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [userEmail, setUserEmail] = useState('');
  // const [userPassword, setUserPassword] = useState('');
  const [userData, setUserData] = useState({email: '', password: ''});

  const loginUser = () => {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData: IUser = {
        email: user.email,
        id: user.uid,
        name: user.displayName,
        accessToken: user.refreshToken,
        photoURL: user.photoURL,
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
        userData={userData}
        setUserData={setUserData}
        createNewUser={loginUser}
      />
    </div>
  )
}

export default LoginPage