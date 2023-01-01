import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
import { setUser, updateImage, updateName } from '../app/feautures/userSlice';
import { IUser, IUserData } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';

const AuthPage = () => {

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>({firstName: '', lastName: '', email: '', password: '', image: null});
  const [serverError, setServerError] = useState('');
  
  const createNewUser = async () => {
    setServerError('');
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
      if (userData.image) {
        const storageRef = ref(storage, userData.email);
        const uploadTask = uploadBytesResumable(storageRef, userData.image);

        uploadTask.on('state_changed', () => {
        }, 
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            if (auth.currentUser) {
              const userName = `${userData.firstName.trim()} ${userData.lastName.trim()}`;
              updateProfile(auth.currentUser, {
                displayName: userName,
                photoURL: downloadURL,
              })

              dispatch(updateName(userName));
              dispatch(updateImage(downloadURL));
            }
          });
        }
        );
      } else {
        if (auth.currentUser) {
          const userName = `${userData.firstName.trim()} ${userData.lastName.trim()}`;
          const userImage = 'https://yakovgo.gosuslugi.ru/netcat_files/8/110/headshot_2_.jpg';

          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: userImage,
          })

          dispatch(updateName(userName));
          dispatch(updateImage(userImage));
        }
      }
    }).catch((error) => { 
      const errorMessage = error.message;
      setServerError(errorMessage);
    });
  }

  return (
    <div className='container login__container'>
      <AppAuthSignup
        createNewUser={createNewUser}
        userData={userData}
        setUserData={setUserData}
        serverError={serverError}
      />
    </div>
  )
}

export default AuthPage