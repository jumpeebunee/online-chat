import React, { FC } from 'react'
import { IUserData } from '../types/types'
import AppInput from './UI/AppInput/AppInput'

interface AppAuthInputProps {
  title: string,
  isError: boolean,
  setValue: Function,
  value: IUserData,
  currentKey: string,
  errorMessage: string,
}


const AppAuthInput:FC<AppAuthInputProps> = ({title, isError, setValue, value, currentKey, errorMessage}) => {
  return (
    <div>
      <AppInput title={title} isError={isError} setValue={setValue} value={value} currentKey={currentKey}/>  
      {isError && <label className='login__label'>{errorMessage}</label>}
    </div>
  )
}

export default AppAuthInput