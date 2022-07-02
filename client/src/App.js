import Login from './components/Login/Login';
import Singup from './components/Signup/Singup';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Singup />} />
      </Routes>
    </BrowserRouter>
    //Adding test cmt
  );
}

export default App;
