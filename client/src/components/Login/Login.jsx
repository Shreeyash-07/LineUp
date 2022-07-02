import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    <form method='POST'>
        Email:<input type="email" name='email' id='email' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/><br />
        Password:<input type="password" name='password' id='password' 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
        <input type="submit" value="submit"
        onClick={PostData} />
    </form>
  )
}

export default Login