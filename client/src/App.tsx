import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./context/DataContext";

import "./App.css";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <DataProvider>
        <>
          <Routes>
            {/* <Route path='/user-dashboard' element={<Home />} /> */}
            <Route path='/' element={<Home />} />
          </Routes>
        </>
      </DataProvider>
    </Router>
  );
};

export default App;
