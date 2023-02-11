import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Notes from "../components/Notes/Notes";
import { DataContext } from "../context/DataContext";
import { AllContext } from "../context/types";

const Dashboard = () => {
  const {notes} = useContext(DataContext) as AllContext;
  return (
    <div>
      <Navbar />
      <Notes notes={notes} oneNote={false} />
    </div>
  );
};

export default Dashboard;
