import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { AllContext } from '../../context/types';
import { AuthButton } from '../Buttons/Buttons';
import { FormInput } from '../inputs/Inputs';
import style from "./login.module.css"

const Signup = () => {
    const {handleSignup} = useContext(DataContext) as AllContext;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword:"",
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name, value} =  e.target;
        setFormData(prev=>{
            return{...prev, [name]:value}
        });
    }

  return (
    <div className={style["login-container"]}>
        Signup
        <FormInput type="email" placeholder="email" onChange={handleChange} name="email" />
        <FormInput type="password" placeholder="password" onChange={handleChange} name="password" />
        <FormInput type="password" placeholder="confirm password" onChange={handleChange} name="confirmPassword" />
        <AuthButton text='Submit' onClick={()=>handleSignup(formData)}/>
    </div>
  )
}

export default Signup;
