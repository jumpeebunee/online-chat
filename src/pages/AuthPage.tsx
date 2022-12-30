import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUser, updateImage, updateName } from '../app/feautures/userSlice';
import { IUser, IUserData } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';

const AuthPage = () => {

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>({firstName: '', lastName: '', email: '', password: ''})

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (200 - 1) + 1);
  }

  const createNewUser = async () => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const userInfo: IUser = {
          email: user.email,
          id: user.uid,
          name: null,
          accessToken: user.refreshToken,
          photoURL: null,
        }
        dispatch(setUser(userInfo));
      }
    }).then(() => {
      if (auth.currentUser) {
        const userImage = `https://picsum.photos/id/${getRandomNumber()}/200/200`;
        const userName = `${userData.firstName.trim()} ${userData.lastName.trim()}`;

        updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL: userImage,
        })
        
        dispatch(updateImage(userImage));
        dispatch(updateName(userName));
      }
    }).catch((error) => { 
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