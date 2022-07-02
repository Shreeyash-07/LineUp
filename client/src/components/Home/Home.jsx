import React from 'react'
import { useState } from 'react';
import {QrReader} from 'react-qr-reader';
import QrScanLogo from '../../images/qr-code.png'
import Navbar from '../Navbar/Navbar';
import Tabs from '../Tabs/Tabs'
import './Home.scss';
import useFetch from '../../Hooks/useFetch';
const Home = () => {
    const {data,loading,erorr} = useFetch('/getslots');
    console.log(data);
    const [isQrClick,setQrCLick] = useState(false);
    const [dat,setData] = useState('No result');
    const OpenQR = (e) =>{
    e.preventDefault();
    setQrCLick(true);
    console.log(dat);
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
              setData(result?.text);
            }
            if(!!error){
              console.info(error);
            }
          }}/>:null}
        </div>
        {data.timeArr}
        <Tabs/>
      </div>
    </div>
    </>
  )
}

export default Home