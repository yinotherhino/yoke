import {
  createContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import MyApiReq from "../utils/apiReq";
import { AllContext, FormTypes, UserContent } from "./types";

export const DataContext = createContext<AllContext | null>(null);

export const DataProvider = ({ children }: { [key: string]: ReactElement }) => {
  return (
    <DataContext.Provider
      value={{
        showForm,
        changeForm,
        handleLoginSuccess,
        alert,
        changeAlert,
        user,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
