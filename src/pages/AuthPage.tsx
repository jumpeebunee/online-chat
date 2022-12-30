import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUser } from '../app/feautures/userSlice';
import { IUser, IUserData } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';

const AuthPage = () => {

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>({firstName: '', lastName: '', email: '', password: ''})

  const createNewUser = async () => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const userInfo: IUser = {
          email: user.email,
          id: user.uid,
          name: `${userData.firstName.trim()} ${userData.lastName.trim()}`,
          accessToken: user.refreshToken,
        }
        dispatch(setUser(userInfo));
      }
    }).then(() => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: `${userData.firstName.trim()} ${userData.lastName.trim()}`,
        })
      }
    })
    .catch((error) => { 
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <div className='container login__container'>
      <AppAuthSignup
        createNewUser={createNewUser}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  )
}

export default AuthPage