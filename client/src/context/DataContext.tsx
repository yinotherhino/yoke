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
import {
  AllContext,
  FormTypes,
  IFormData,
  INote,
  INoteData,
  UserContent,
} from "./types";

export const DataContext = createContext<AllContext | null>(null);

export const DataProvider = ({ children }: { [key: string]: ReactElement }) => {
  const [user, setUser] = useState<UserContent | null>(null);
  const [showForm, setShowForm] = useState<FormTypes>("login");
  const [showDashForm, setShowDashForm] = useState<
    "addnote" | "editnote" | null
  >(null);
  const [token, setToken] = useState<string | null>(null);
  const [notes, setNotes] = useState<INote[] | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const getAllNotes = async () => {
    const res = await MyApiReq.get("/notes");
    setNotes(()=>res.data.notes);
  };

  const getNodeById = async (_id: string) => {
    try {
      const res = await MyApiReq.get(`/notes/${_id}`);
      return res.data.note;
    } catch (err) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

  useEffect(() => {
    // const storageUser = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token");
      if(storageToken){
        getAllNotes();
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
      const storageUser = localStorage.getItem("user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));  
      }

  }, [localStorage.getItem("user")]);

  const changeForm = (type: FormTypes) => {
    setShowForm(type);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false)
    toast.success("Logout successful", { toastId: "logout" });
    changeForm("login");
    navigate("/");
  };

  const handleLogin = async (formData: IFormData) => {
    try {
      const res = await MyApiReq.post("/auth/login", formData);
      handleLoginSuccess(res.data);
      toast.success(res?.data.message, { toastId: "login success" });
      navigate("/dashboard");
      window.location.reload();
    } catch (err: any) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

  const handleSignup = async (formData: IFormData) => {
    try {
      const { email, password } = formData;
      const res = await MyApiReq.post("/auth/signup", { email, password });
      toast.success(res?.data.message, { toastId: "signup success" });
      changeForm("login");
    } catch (err: any) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

  const handleLoginSuccess = ({
    token,
    user,
  }: {
    token: string;
    user: UserContent;
  }) => {
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const handleEditNote = async (noteData: INote) => {
    try {
      const res = await MyApiReq.patch(`/notes/${noteData._id}`, noteData);
      toast.success(res?.data.message, { toastId: "addnote success" });
      window.location.reload();
      setShowDashForm(null);
    } catch (err: any) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

  const handleAddNote = async (noteData: INoteData) => {
    try {
      const res = await MyApiReq.post("/notes", noteData);
      setNotes(prev => {
        if(!prev){
          return [res.data.note];
        }
        return [...prev, res.data.note];
      })
      
      toast.success(res?.data.message, { toastId: "addnote success" });
      setShowDashForm(null);
    } catch (err: any) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        navigate("/");
        toast.warning("Please login", { toastId: "login warn" });
        return;
      }
      const { _id } = user;
      const res = await MyApiReq.delete(`/auth/${_id}`);
      toast.success(res?.data.message, { toastId: "delete success" });
      changeForm("login");
      navigate("/");
    } catch (err: any) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

  const handleDeleteNote = async (_id: string) => {
    try {
      if (!notes) {
        return;
      }
      const res = await MyApiReq.delete(`/notes/${_id}`);
      toast.success("note deleted successfully", { toastId: "delete success" });
      setNotes(prev =>{
        if(!prev){
          return prev;
        }
        const index = prev.findIndex(item=>item._id===_id)
        prev.splice(index!,1)
        console.log(prev)
        return prev
      })
      // window.location.reload()
    } catch (err: any) {
      const errorforToastify = errorHandler(err);
      toast.error(errorforToastify[0], errorforToastify[1]);
    }
  };

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
        showDashForm,
        setShowDashForm,
        user,
        notes,
        isLoggedIn,
        getNodeById,
        handleDeleteNote,
        handleEditNote
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
