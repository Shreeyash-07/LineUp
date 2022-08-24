import { useEffect, useState, createContext } from "react";
import Login from "./components/Login/Login";
import Singup from "./components/Signup/Singup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Slots from "./components/Slots/Slots";
import { fetchToken, onMessageListener } from "./firebase-config";
import { useCookies } from "react-cookie";
import Status from "./components/Status/Status";
import Landing from "./components/Landing/Landing";
import Datatable2 from "./components/DataTable/Datatable2";
import Datatable from "./components/DataTable/DataTable";
import Navbar from "./components/Navbar/Navbar";
import Stepper from "./components/Stepper/Stepper";
import TodayDate from "./components/TodayDate/TodayDate";
import Scanner from "./components/Scanner/Scanner";
import Modal1 from "./components/Modal/Modal1";


function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [getFcmToken, setFcmToken] = useState("");
  const [started, setStarted] = useState(false);
  const [cookies, setCookies] = useCookies([]);
  const [isAppointmentBooked, setIsAppointmentBooked] = useState();
  useEffect(() => {
    // setIsAppointmentBooked(cookies.Booked);
    console.log(isAppointmentBooked);
    const data = window.localStorage.getItem("timeIsset");
    if (data !== null) {
      console.log("inside");
      setStarted(true);
    }
    fetchToken(setTokenFound, setFcmToken);
  }, []);

  // window.localStorage.setItem('timeIsset',false);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/todaydate" element={<TodayDate />} />
        <Route path="/stepper" element={<Stepper />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/datatable2" element={<Datatable2 />} />
        <Route path="/datatable" element={<Datatable />} />
        <Route path="/Modal1" element={<Modal1 />}/>
        <Route
          exact
          path="/slots"
          element={
            
              <Slots />
            
          }
        />
        <Route
          exact
          path="/status"
          element={
            
              <Status />
            
              
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
