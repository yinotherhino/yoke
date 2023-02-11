import React from 'react'
import style from './buttons.module.css'

export const AuthButton = ({text, onClick}:{text:string; onClick:React.MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <button className={style['auth-btn']} onClick={onClick}>
        {text}
    </button>
  )
}
