import React from "react"
import style from "./inputs.module.css"

export const FormInput = ({placeholder, type, onChange, name}:{placeholder:string;type:string; onChange:React.ChangeEventHandler, name:string})=>{
    return (
        <input type={type} placeholder={placeholder} className={style["form-input"]} onChange={onChange} />
    )
}