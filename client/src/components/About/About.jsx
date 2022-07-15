import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const CalAboutPage = async () =>{
        try {
            const res = await fetch("/about",{
                method : "GET",
                headers :{
                    Accept:"application/json",
                  "Content-Type":"application/json"
                },
                credentials:"include"
              });

              const data =await res.json();
              console.log(data);
              if(!res.status === 200){
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    }

useEffect(()=>{
    CalAboutPage();
},[]);

  return (
    <>
    
    <h1>About</h1>
            <form method="GET">
    <div className='row'>
        <div className='col-md-6'>

            name
        </div>
        <div className='col-md-6'>
            Email
        </div>
        
    </div>
            </form>
    </>
  )
}

export default About