import { useEffect, useState } from "react";
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
// import Stepper from "./components/Stepper/Stepper";
import TodayDate from "./components/TodayDate/TodayDate";
import Scanner from "./components/Scanner/Scanner";
<<<<<<< HEAD
import Singup2 from "./components/Signup2/Signup2";
import Modal1 from "./components/Modal/Modal1";
import Add from "./components/Queue/Add";
import Help from "./components/Help/Help";
// import Department from "./components/Department/Department";
import Dept1 from "./components/Department/Dept1/Dept1";
import Dept2 from "./components/Department/Dept2/Dept2";
import Dept3 from "./components/Department/Dept3/Dept3";
import Doc1 from "./components/Department/Doc1";
import Hospital from "./components/Department/Hospital";
import Depart from "./components/Department/Depart";
=======
import Modal1 from "./components/Modal/Modal1";
import Modal2 from "./components/Modal/Modal2";
>>>>>>> c321473c1bf9c54383ffd8d30d74baedf0b7b09d

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
      {/* <Navbar /> */}
      <Routes>
        <Route path="/signup2" element={<Singup2 />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/todaydate" element={<TodayDate />} />
        {/* <Route path="/stepper" element={<Stepper />} /> */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/datatable2" element={<Datatable2 />} />
        <Route path="/datatable" element={<Datatable />} />
<<<<<<< HEAD
        <Route path="/Modal1" element={<Modal1 />} />
        <Route exact path="/slots" element={<Slots />} />
        <Route exact path="/status" element={<Status />} />
        <Route exact path="/add" element={<Add />} />
        <Route path="/help" element={<Help />} />

        {/* DEPARTMENT ROUTES */}
        {/* <Route path="/department" element={<Department />} /> */}
        <Route path="/dep1details" element={<Dept1 />} />
        <Route path="/dep2details" element={<Dept2 />} />
        <Route path="/dep3details" element={<Dept3 />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/doc1" element={<Doc1 />} />
        <Route path="/depart" element={<Depart />} />
=======
        <Route path="/Modal1" element={<Modal1 />}/>
        <Route path="/Modal2" element={<Modal2 />}/>
        <Route
          exact
          path="/slots"
          element={
            isAppointmentBooked ? (
              <Slots />
            ) : (
              <Navigate replace to={"/status"} />
            )
          }
        />
        <Route
          exact
          path="/status"
          element={
            !isAppointmentBooked ? (
              <Status />
            ) : (
              <Navigate replace to={"/slots"} />
            )
          }
        />
>>>>>>> c321473c1bf9c54383ffd8d30d74baedf0b7b09d
      </Routes>
    </BrowserRouter>
  );
}

export default App;
