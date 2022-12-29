import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';

const AuthPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userInfo, setUserInfo] = useState({firstName: '', lastName: ''});
  const [registerUser, setRegisterUser] = useState(false);

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
      setRegisterUser(true);
      // navigate('/');
    }).then(() => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: `${userInfo.firstName.trim()} ${userInfo.lastName.trim()}`,
        })
      }
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
        registerUser={registerUser}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  )
}

export default AuthPage