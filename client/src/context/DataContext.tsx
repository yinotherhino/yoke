import {
  createContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import MyApiReq from "../utils/apiReq";
import { AllContext, FormTypes, IFormData, UserContent } from "./types";

export const DataContext = createContext<AllContext | null>(null);

export const DataProvider = ({ children }: { [key: string]: ReactElement }) => {
  const [user, setUser] = useState<UserContent | null>(null)
  const [showForm, setShowForm] = useState<FormTypes>('login');
  const navigate = useNavigate()

  const changeForm = (type:FormTypes)=>{
    setShowForm(type)
  }

  const handleLogout = ()=>{
    localStorage.clear();
    sessionStorage.clear();
  }

  const handleLogin = async (formData:IFormData)=>{
    const res = await MyApiReq.post("/auth/login",formData);

  }

  const handleSignup = async (formData:IFormData)=>{
    const res = await MyApiReq.post("/auth/signup",formData);
    
    
  }

  const handleLoginSuccess = (token: string, user: UserContent)=>{
    localStorage.setItem("token", token)
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    navigate("/dashboard")
  }
  return (
    <DataContext.Provider
      value={{
        showForm,
        handleLogout,
        changeForm,
        handleLogin,
        handleSignup,
        handleLoginSuccess,
        // alert,
        // changeAlert,
        user,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
