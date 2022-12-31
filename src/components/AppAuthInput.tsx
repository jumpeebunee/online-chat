import React, { FC } from 'react'
import { ILogin, IUserData } from '../types/types'
import AppInput from './UI/AppInput/AppInput'

interface AppAuthInputProps {
  title: string,
  isError: boolean,
  setValue: Function,
  value: IUserData | ILogin,
  currentKey: string,
  errorMessage: string,
  type: string,
}


const AppAuthInput:FC<AppAuthInputProps> = ({title, isError, setValue, value, currentKey, errorMessage, type}) => {
  return (
    <div>
      <AppInput type={type} title={title} isError={isError} setValue={setValue} value={value} currentKey={currentKey}/>  
      {isError && <label className='login__label'>{errorMessage}</label>}
    </div>
  )
}

export default AppAuthInput