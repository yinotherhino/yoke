import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { DataContext } from './useContext';
// import { AllContext } from '../interface';

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  

  if(!token){
    navigate("/")
    return<></>;
  }
  return <>{token && children}</>;
};

export default ProtectRoute;
