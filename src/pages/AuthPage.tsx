import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, storage } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
import { updateImage, updateName } from '../app/feautures/userSlice';
import { IUserData } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';
import { db } from '../firebase';

const AuthPage = () => {

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>({firstName: '', lastName: '', email: '', password: '', image: null});
  const [serverError, setServerError] = useState('');

  const createNewUser = async () => {

    const displayName = `${userData.firstName.trim()} ${userData.lastName.trim()}`;
    const email = userData.email;
    const file = userData.image ? userData.image : 'https://yakovgo.gosuslugi.ru/netcat_files/8/110/headshot_2_.jpg';

    const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

    const storageRef = ref(storage, userData.email);

    if (file instanceof File) {
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async(downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            dispatch(updateImage(downloadURL));
          } catch(e) {  
            setServerError('Unknown error');
          }
        })
      });
    } else {
      await updateProfile(res.user, {
        displayName,
        photoURL: file,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: file,
      });
      dispatch(updateImage(file));
    }
    await setDoc(doc(db, "usersChats", res.user.uid), {});
    dispatch(updateName(displayName));
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