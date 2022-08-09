import React from 'react'
import { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [userData ,setUserData] = useState("");
    const CalAboutPage = async () =>{
        try { 
            console.log('callabout')
            const res = await fetch("/about");

              const data =await res.json();
              console.log(data)
              setUserData(data);
              console.log(userData.data)
            //   setUserData(data._id);
            //   console.log(userData); 
            //   console.log(userData.data._id)

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
    setLoading(false);
},[]);

if (isLoading) {
    return (
      <div  className="loadingContainer">
        <h1>Loading...</h1>
    </div>
    )
  } else {


      return (
        <>
        <div className='container'>
            <form  method="get">
                <div className='row'>
                    <div className='col-md-6 pl-2'>
                        <div className='profiletab' id='mytab'>
                            <div className='show active' id='tabpanel'>
                                <div className='row mt-3'>
                                    <div className='col-md-8'>
                {/* <h1>{userData._id}</h1> */}
                                    <label>Name</label>
                                    </div>
                                    <div className='col-md-4'>
                                    {userData.data.name}
                                    </div>
      
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-md-8'>
                                    <label>Email</label>
                                    </div>
                                    <div className='col-md-4'>
                                    {userData.data.email}
                                    
                                    </div>
                                <div className='row mt-3'>
                                    <div className='col-md-8'>
                                    <label>Phone</label>
                                    </div>
                                    <div className='col-md-4'>
                                    {userData.data.phone}
                                    </div>
      
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
     // your code here
}


export default About