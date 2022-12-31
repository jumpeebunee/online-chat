import React, { ChangeEvent, FC } from 'react'
import { IUserData, ILogin } from '../../../types/types'; 
import cl from './AppInput.module.css';

interface AppInputProps {
  title: string,
  isError: boolean,
  setValue: Function,
  value: IUserData | ILogin,
  currentKey: string,
  type: string,
}

const AppInput:FC<AppInputProps> = ({title, isError, setValue, value, currentKey, type}) => {

  function changeData(e: ChangeEvent<HTMLInputElement>) {
    const copyObject = value;
    copyObject[currentKey as keyof typeof value] = e.target.value;
    setValue(copyObject);
  }

  return (
    <input
      type={type}
      className={isError ? [cl.input, cl.input_error].join(' ') : cl.input}
      placeholder={title}
      onChange={(e) => changeData(e)}
    />
  )
}

export default AppInput