import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import ProfilePage from '../pages/ProfilePage'

const AppNavigation = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/auth' element={<AuthPage/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>
    </Routes>
  )
}

export default AppNavigation