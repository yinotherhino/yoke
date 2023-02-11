import React from "react"
import style from "./inputs.module.css"

export const FormInput = ({placeholder, type, onChange, name, value}:{placeholder:string;type:string; onChange:React.ChangeEventHandler, name:string; value:string})=>{
    return (
        <input type={type} placeholder={placeholder} className={style["form-input"]} name={name} value={value} onChange={onChange} />
    )
}

export const NoteInput = ({placeholder, type, onChange, name, value}:{placeholder:string;type:string; onChange:React.ChangeEventHandler, name:string; value:string})=>{
    return (
        <input type={type} placeholder={placeholder} className={style["note-input"]} name={name} value={value} onChange={onChange} />
    )
}