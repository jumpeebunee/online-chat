import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const AuthPage = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const createNewUser = async () => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
    <div>
      <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} className='input' placeholder='Введите вашу почту'/>
      <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} className='input' placeholder='Введите пароль'/>
      <button onClick={createNewUser}>Зарегистрироваться</button>
      <Link to="/login">Войти</Link>
    </div>
  )
}

export default AuthPage