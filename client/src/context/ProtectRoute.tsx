import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { DataContext } from './useContext';
// import { AllContext } from '../interface';

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      toast.warning("please login", {toastId:"nav to home"})
      navigate("/")
    }

  },[])

  return <>{token && children}</>;
};

export default ProtectRoute;
