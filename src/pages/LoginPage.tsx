import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const loginUser = () => {

  }

  return (
    <div>
      <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} className='input' placeholder='Введите вашу почту'/>
      <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} className='input' placeholder='Введите пароль'/>
      <button onClick={loginUser}>Войти</button>
      <Link to="/auth">Зарегистрироваться</Link>
    </div>
  )
}

export default LoginPage