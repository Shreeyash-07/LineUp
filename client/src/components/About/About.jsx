import React from 'react'
import { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const [userData ,setUserData] = useState();
    const CalAboutPage = async () =>{
        try { 
            console.log('callabout')
            const res = await fetch("/about");

              const data =await res.json();
              setUserData(data.data);
            //   console.log(userData); 
              if(!res.status === 200){
                throw new Error(res.error);
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }

useEffect(()=>{
    console.log('useeffect')
    CalAboutPage();
},[]);

  return (
    <>
    <div className='container'>
        <form  method="get">
            <h1>{userData._id}</h1>
            <div className='row'>
                <div className='col-md-6 pl-2'>
                    <div className='profiletab' id='mytab'>
                        <div className='show active' id='tabpanel'>
                            <div className='row mt-3'>
                                <div className='col-md-8'>
                                <label>USERID</label>
                                </div>
                                <div className='col-md-4'>
                                765432456
                                </div>

                            </div>
                            <div className='row mt-3'>
                                <div className='col-md-8'>
                                <label>NAme</label>
                                </div>
                                <div className='col-md-4'>
                                Sanket
                                </div>

                            </div>
                            <div className='row mt-3'>
                                <div className='col-md-8'>
                                <label>Email</label>
                                </div>
                                <div className='col-md-4'>
                                Email@gmail.com
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default About