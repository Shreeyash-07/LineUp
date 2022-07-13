import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const adminEmail = "admin";
  const adminPassword = "abcd@1234";
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const PostData = async(e) =>{
    e.preventDefault();
    console.log('Hello from login')
      if(email===adminEmail && password===adminPassword){
        window.alert('Welcome Admin');
        navigate('/admin');
      }
      else
      {
        const res = await fetch('/login',{
          method:'POST',
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            email,password
          })
        });
  
        const data = res.json();
        
        if(data.status === 401 || !data){
          window.alert('INVALID');
        }else{
          window.alert('SUCCESS');
          navigate('/');
        }
      }   
  }

  return (
    <div className='container-fluid main-container m-3 '>
      <h2>Login</h2>
    <form>
  <div className="row mb-3">
    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" 
      id="email" name='email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      placeholder="Email"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" 
      id="password" name='password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="Password"
      />
    </div>
  </div>


  <div className='text-center'>
  <NavLink to="/signup">New User?Register here</NavLink><br />
  <button type="submit" className="btn btn-primary"
  name='login' id='login' value="submit"
  onClick={PostData} 
  >Login</button>
  </div>
</form>
    </div>

    // <form method='POST'>
    //     Email:<input type="email" name='email' id='email' 
    //     value={email}
    //     onChange={(e)=>setEmail(e.target.value)}/><br />
    //     Password:<input type="password" name='password' id='password' 
    //     value={password}
    //     onChange={(e)=>setPassword(e.target.value)}/>
    //     <input type="submit" value="submit"
    //     onClick={PostData} />
    // </form>
  )
}

export default Login