import React, { useContext, useEffect } from "react";
// import { DataContext } from './useContext';
// import { AllContext } from '../interface';

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const { verifyToken, loginStatus } = useContext(DataContext) as AllContext;
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    verifyToken(token);
  }, []);
  return <>{children}</>;
};

export default ProtectRoute;
