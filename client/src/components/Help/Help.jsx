import React from 'react'
import Navbar from '../Navbar/Navbar'


const Help = () => {
    return (
        <>
            <Navbar />
            <div className='container' style={{
        backgroundColor: "#3e96e3 !important",
        'boxShadow': '0 2px 8px 0 rgb(0 0 0)'
      }}>
                <h1 className='my-3' >Help and Support</h1>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <strong>Difficulty in Booking Appointment ?</strong>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body" >
                                You can Login into your account, Check for the Slots available and easily book your appointment.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <strong>Difficulty in Booking Appointment ?</strong>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body" >
                                Call Parth.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <strong>Broswer Compatible</strong>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body" >
                                TextUtils is much Compatible with browser as it is a React Application built React Developer Tools.
                                User can easily access the pages and can use it in a very efficient way.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Help