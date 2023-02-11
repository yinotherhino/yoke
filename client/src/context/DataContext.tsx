import {
  createContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyApiReq from "../utils/apiReq";
import errorHandler from "../utils/errorHandler";
import { AllContext, FormTypes, IFormData, INoteData, UserContent } from "./types";

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
    toast.success("Logout successful", {toastId:"logout"})
    changeForm("login")
    navigate("/")
  }

  const handleLogin = async (formData:IFormData)=>{
    try{
      console.log(formData)
      const res = await MyApiReq.post("/auth/login",formData);
      handleLoginSuccess(res.data)
      toast.success(res?.data.message, {toastId:"login success"})
      navigate("/dashboard")
    }
    catch(err:any){
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }

  }

  const handleSignup = async (formData:IFormData)=>{
    try{
      const {email, password} = formData;
      const res = await MyApiReq.post("/auth/signup",{email, password});
      console.log(res)
      toast.success(res?.data.message, {toastId:"signup success"})
      changeForm("login")
    }
    catch(err:any){
      console.log(err)
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
    
  }

  const handleLoginSuccess = ({token, user}:{token: string, user: UserContent})=>{
    localStorage.setItem("token", token)
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    navigate("/dashboard")
  }

  const handleAddNote = async (noteData: INoteData)=>{
  
  }

  const handleDeleteAccount = async()=>{
    try{
      if(!user){
        navigate("/")
        return;
      }
      const {_id} = user
        const res = await MyApiReq.delete(`/auth/${_id}`)
        toast.success(res?.data.message, {toastId:"delete success"})
        changeForm("login")
        navigate("/")
      }
    catch(err:any){
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
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
        handleDeleteAccount,
        handleAddNote,
        // changeAlert,
        user,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
