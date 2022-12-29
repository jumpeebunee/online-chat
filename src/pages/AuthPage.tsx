import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';

const AuthPage = () => {

  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userData, setUserData] = useState({email: '', password: ''})
  const [userInfo, setUserInfo] = useState({firstName: '', lastName: ''});

  const createNewUser = async () => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData: IUser = {
        email: user.email,
        id: user.uid,
        accessToken: user.refreshToken,
      }
      dispatch(setUser(userData));
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
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  )
}

export default AuthPage