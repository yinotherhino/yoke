import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import { DataProvider } from "./context/DataContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <DataProvider>
        <>
        <ToastContainer />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </>
      </DataProvider>
    </Router>
  );
};

export default App;
