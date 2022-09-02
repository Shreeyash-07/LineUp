import React, { useState, useEffect } from "react";

const Modal1 = ({ minutes, seconds, yourToken, servingToken }) => {
  const [timeUp, setTimeUp] = useState(false);
  const callForCheckingTime = () => {
    if (minutes + seconds <= 0) {
      setTimeUp(true);
    }
  };
  useEffect(() => {
    callForCheckingTime();
  }, []);

  return (
    <>
      <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header">Current Appointment</div>
        <div className="card-body">
          <h5 className="card-title" style={{ fontFamily: "inherit" }}>
            Estimated Time
          </h5>
          <p
            className="card-title"
            style={{ fontSize: "40px", fontFamily: "inherit" }}
          >
            {timeUp ? (
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "inherit",
                  fontWeight: "500",
                }}
              >
                Its your time to be served
              </div>
            ) : (
              <>
                {minutes}:{seconds}
              </>
            )}
          </p>
          <h5
            className="card-Body text-secondary"
            style={{ fontFamily: "inherit" }}
          >
            Current Token no.
          </h5>
          <p className="card-text">{servingToken}</p>
          <h5 className="card-body text-info" style={{ fontFamily: "inherit" }}>
            Your Token no.
          </h5>
          <p className="card-text">{yourToken}</p>
        </div>
      </div>
    </>
  );
};

export default Modal1;
