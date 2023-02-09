import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./context/DataContext";

import "./App.css";

const App = () => {
  return (
    <Router>
      <DataProvider>
        <>
          <Routes>
            {/* <Route path='/user-dashboard' element={<Dashboard />} />
        <Route path='/' element={<Home />} /> */}
          </Routes>
        </>
      </DataProvider>
    </Router>
  );
};

export default App;
