import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AllContext } from '../../context/types';
import { AuthButton } from '../Buttons/Buttons';
import { FormInput } from '../inputs/Inputs';
import style from "./login.module.css"

const Login = () => {
    const {handleLogin} = useContext(DataContext) as AllContext;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name, value} =  e.target;
        setFormData(prev=>{
            return {...prev, [name]:value}
        });
    }

  return (
    <div className={style["login-container"]}>
        Login
        <FormInput type="email" placeholder="email" value={formData.email} onChange={handleChange} name="email" />
        <FormInput type="password" placeholder="password" value={formData.password} onChange={handleChange} name="password" />
        <AuthButton text='Submit' onClick={()=>handleLogin(formData)}/>
    </div>
  )
}

export default Login