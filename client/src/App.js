import Login from './components/Login/Login';
import Singup from './components/Signup/Singup';
import { useState,useEffect } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Navbar from './components/Navbar/Navbar'
// import Slotbook from './components/Slotbook/Slotbook';
import About from './components/About/About';
import Queue from './components/Queue/Queue';
import Slots from './components/Slots/Slots';
// import bootstrap from './bootstrap/dist/css';

function App() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const data = window.localStorage.getItem("timeIsset");
    if (data !== null) {
      console.log("inside");
      setStarted(true);
    }
    console.log(started);
  }, []);
  // window.localStorage.setItem('timeIsset',false);
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/getslots' element={<Slots />}/>
        <Route path='/about' element={<About />}/>
        {/* <Route path='/queuev' element={<QueueVisual />}/> */}
        {/* <Route path='/queue' element={<Queue />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
