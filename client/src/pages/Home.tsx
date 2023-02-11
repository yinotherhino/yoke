import React, { useContext } from 'react'
import Login from '../components/Login/Login';
import Signup from '../components/Login/Signup';
import Navbar from '../components/Navbar/Navbar';
import { DataContext } from '../context/DataContext';
import { AllContext } from '../context/types';

const Home = () => {
  const {showForm} = useContext(DataContext) as AllContext;
  return (<>
    <Navbar />
    {showForm==="login" ? <Login /> : <Signup />}
  </>
  )
}

export default Home;