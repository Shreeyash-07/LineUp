import React from 'react'
import { useState,useEffect } from 'react';
import {QrReader} from 'react-qr-reader';
import QrScanLogo from '../../images/qr-code.png'
import Navbar from '../Navbar/Navbar';
import Tabs from '../Tabs/Tabs'
import './Home.scss';
import useFetch from '../../Hooks/useFetch';
const Home = () => {
  
  const [isQrClick,setQrCLick] = useState(false);
  const [dat,setDat] = useState('No result');

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  
  useEffect(()=>{
    const fetchData = async() =>{
        setLoading(true);
        try{
            const res = await fetch('/getslots');
            const mainData = await res.json();
            setData(mainData);
        }catch(err){
            setError(err);
        }
        setLoading(false);
    };
    if(localStorage.getItem('timeIsset')===true){
      console.log(localStorage.getItem('timeIsset'));
      console.log('inside');
      fetchData();
    }
  },[]);
    
    
    const OpenQR = (e) =>{
    e.preventDefault();
    setQrCLick(true);
    console.log(dat);
   }
   const slotBook = (e) => {
    e.preventDefault();
    console.log(e.target.getAttribute('value'));
   }
  return (
    <>
    {/* <Navbar/> */}
    <div className="outer_container">
      <div className="inner_container">
        <div className="middle_container">
          <img style={{display : isQrClick? 'none':'block' }} src={QrScanLogo} alt="Scanner" 
          onClick={OpenQR}/>
          {isQrClick ? <QrReader
          onResult={(result,error)=>{
            if(!!result){
              setDat(result?.text);
            }
            if(!!error){
              console.info(error);
            }
          }}/>:null}
        </div>
        {!localStorage.getItem('timeIsset') && 
        <ul>
          {data.map((element,index)=>(
            <li 
            key={index}
            value={element}
            onClick={slotBook}
            style={{cursor:"pointer"}}
            >{element}
            </li>
          ))}
        </ul>}
        {}
        {/* <Tabs/> */}
        
      </div>
    </div>
    </>
  )
}

export default Home