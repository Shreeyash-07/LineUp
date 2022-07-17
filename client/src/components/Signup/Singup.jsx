import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import './Signup.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Singup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password, phone } = user;

        const res = await fetch("/signup",{
          method : "POST",
          headers :{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name,email,password,phone
          })
        });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("INVALID");
    } else {
      window.alert("SUCCESS");
      navigate("/login");
    }
  }
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const toggleIsPasswordShowValue = (e) => {
    e.preventDefault();
    setIsPasswordShow(!isPasswordShow);
};

  return (

    <div className='container-fluid main-container m-3 '>
      <h1>Sign Up</h1>
    <form>
  <div className="row mb-3">
    <label htmlFor="name" className="col-sm-2 col-form-label">Name
    </label>
    <div className="col-sm-10">
      <input type="text" className="form-control"
      id="name" 
      name='name'
      value={user.name}
      onChange={handleInputs}
      placeholder="Name"
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" 
      id="email" name='email'
      value={user.email}
      onChange={handleInputs}
      placeholder="Email"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" 
      id="password" name='password'
      value={user.password}
      onChange={handleInputs}
      placeholder="Password"
      />

      <button className='eye-icon' onClick={toggleIsPasswordShowValue}>
      { isPasswordShow ? <i class="bi bi-eye-fill"></i> : <i class="bi bi-eye-slash-fill"></i>}
      </button>
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="password" className="col-sm-2 col-form-label">Phone</label>
    <div className="col-sm-10">
      <input type="phone" className="form-control" 
      id="phone" name='phone'
                value={user.phone}
                onChange={handleInputs}
                placeholder="Phone"
      />
    </div>
  </div>
  <div className='text-center'>
  <NavLink to='/login'>Already a User?Login here</NavLink><br />
  <button type="submit" className="btn btn-primary"
  name='signup' id='signup'
  onClick={postData} 
  >Sign Up</button>
  </div>
</form>
    </div>

    // <div className="container">
    //   <div className="details">
        
    //     <form method="POST">
    //       Name:<input type="text" id="name" name='name'
    //           value={user.name}
    //           onChange={handleInputs}
    //           placeholder="Name"
    //       /><br/>
    //       Email:<input type="email" id="email" name='email'
    //           value={user.email}
    //           onChange={handleInputs}
    //           placeholder="Email"
    //       /><br/>
    //       Password:<input type="password" id="password" name='password'
    //           value={user.password}
    //           onChange={handleInputs}
    //           placeholder="Password"
    //       /><br/>
    //       Phone:<input type="text" id="phone" name='phone'
    //           value={user.phone}
    //           onChange={handleInputs}
    //           placeholder="Phone"
    //       /><br/>
    //       <input type="submit" name='signup' id='signup'
    //           onClick={postData}
    //       />
    //     </form>
    //   </div>
    // </div>
  )}
export default Singup;
