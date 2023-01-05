import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
import { updateImage, updateName } from '../app/feautures/userSlice';
import { IUserData } from '../types/types';
import AppAuthSignup from '../components/AppAuthSignup';
import { db } from '../firebase';
import getRandomNumber from '../helpers/getRandomNumber';

const AuthPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUserData>({firstName: '', lastName: '', email: '', password: '', image: null});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createNewUser = async () => {

    setIsLoading(true);

    const displayName = `${userData.firstName.trim()} ${userData.lastName.trim()}`;
    const email = userData.email;
    const file = userData.image ? userData.image : 'https://yakovgo.gosuslugi.ru/netcat_files/8/110/headshot_2_.jpg';

    const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const getImage = `https://picsum.photos/id/${getRandomNumber()}/200/300`;

    try {
      await updateProfile(res.user, {
        displayName,
        photoURL: getImage,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: file,
      });
      dispatch(updateImage(getImage));
  
      await setDoc(doc(db, "usersChats", res.user.uid), {});
      dispatch(updateName(displayName));
  
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setServerError('Something went wrong');
    }
  }

  return (
    <div className='container login__container'>
      {isLoading
      ?
      <div className='login__loading'></div>
      :
      <AppAuthSignup
        createNewUser={createNewUser}
        userData={userData}
        setUserData={setUserData}
        serverError={serverError}
        isLoading={isLoading}
      />
      }
    </div>
  )
}

export default AuthPage