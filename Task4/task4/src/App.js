import "./App.css";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Home from "./Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import SignUp from "./component/SignUp";
import "react-toastify/dist/ReactToastify.css";

import RequiredAuth from "./component/RequiredAuth";
import ManageStations from "./component/ManageStations";
import Add from "./component/Add";

function App() {
  return (
    <div className="App ">
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route
          path="/manageStations"
          element={
            <RequiredAuth>
              <ManageStations></ManageStations>
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/Add"
          element={
            <RequiredAuth>
              <Add></Add>
            </RequiredAuth>
          }
        ></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
