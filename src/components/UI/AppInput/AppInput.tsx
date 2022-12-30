import React, { ChangeEvent, FC } from 'react'
import { IUserData } from '../../../types/types';
import cl from './AppInput.module.css';

interface AppInputProps {
  title: string,
  isError: boolean,
  setValue: Function,
  value: IUserData,
  currentKey: string,
}

const AppInput:FC<AppInputProps> = ({title, isError, setValue, value, currentKey}) => {

  function changeData(e: ChangeEvent<HTMLInputElement>) {
    const copyObject = value;
    copyObject[currentKey as keyof typeof value] = e.target.value;
    setValue(copyObject);
  }

  return (
    <input
      type="text"
      className={isError ? [cl.input, cl.input_error].join(' ') : cl.input}
      placeholder={title}
      onChange={(e) => changeData(e)}
    />
  )
}

export default AppInput