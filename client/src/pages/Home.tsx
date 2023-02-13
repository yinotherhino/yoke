import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Signup from '../components/Login/Signup';
import Navbar from '../components/Navbar/Navbar';
import { DataContext } from '../context/DataContext';
import { AllContext } from '../context/types';
import Dashboard from './Dashboard';

const Home = () => {
  const {showForm, isLoggedIn} = useContext(DataContext) as AllContext;
  const navigate = useNavigate();
  useEffect(()=>{
    if (isLoggedIn){
      navigate("/dashboard")
    }
  },[isLoggedIn])
  return (<>
    <Navbar />
    {showForm==="login" ? <Login /> : <Signup />}
  </>
  )
}

export default Home;