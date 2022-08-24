import React from 'react'

const Modal1 = ({minutes,seconds}) => {
  return (
    <>
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem"}}>
              <div className="card-header">Current Appointment</div>
              <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: "inherit" }}>Estimated Time</h5>
                  <p className="card-title" style={{fontSize: "40px", fontFamily:"inherit"}}>{minutes}:{seconds}</p>
                  <h5 className="card-Body text-secondary" style={{fontFamily:"inherit"}}>Current Token no.</h5>
                  <p className="card-text">98</p>
                  <h5 className="card-body text-info" style={{ fontFamily: "inherit" }}>Your Token no.</h5>
                  <p className="card-text">98</p>
              </div>
          </div>
    </>
  )
}

export default Modal1