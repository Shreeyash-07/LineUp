import React,{useState, useEffect } from 'react'
import './Admin.scss'
import { useNavigate } from 'react-router-dom'
import Queue from '../Queue/Queue';
const Admin = () => {
  const [time,setTime] = useState("");
  const [isTime,isTimeSet] = useState(false);
  const PostData = async(e) =>{
    e.preventDefault();
    try{
        fetch('/admin',{mode:'cors'},{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(time)
      }).then((response)=>{
        console.log(response)
        if(response.json().status === 200)
        {
          console.log(response)
          console.log(response.status)
          isTimeSet(true)
        }
      })
      .then((data)=>{console.log(data)})
      .catch((err)=>{console.log(err)});

      // const data = await res.json();
      // if(!data || data.status === 401){
      //   window.alert('Date Not Inserted');
      // }else{
      //   isTimeSet(true);
      //   window.alert('Date Inserted');
      // }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
        <form method='POST'>
          Time:<input type="time" name="time" id="time"
           value={time} 
           onChange={(e)=>setTime(e.target.value)}/>
          <input type="submit" value="submit" onSubmit={PostData}/>
        </form>
        <div className="container">
          <Queue/>
        </div>
        
    </div>
  )
}

export default Admin