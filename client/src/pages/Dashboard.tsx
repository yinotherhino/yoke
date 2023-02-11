import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Notes from '../components/Notes/Notes'



const Dashboard = () => {
  return (
    <div>
        <Navbar isLoggedIn={true} />
        <Notes />
    </div>
  )
}

export default Dashboard