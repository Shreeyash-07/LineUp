import React from 'react'
import Navbar from '../Navbar/Navbar'


const Help = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
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
                                <strong>Avoid the Queues using LineUp</strong>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body" >
                            The user can easily schedule an appointment for a time that is convenient for them. After booking an appointment, you can go to the clinic, scan the QR code and confirm your appointment.
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
                                LineUp is much Compatible with browser as it is a React Application built using React Developer Tools.
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