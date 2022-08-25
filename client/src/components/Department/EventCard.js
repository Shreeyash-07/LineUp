import React from 'react';
import './EventCard.css';

function EventCard({image}) {
  
    return (
        <>
             <div 
                className={"eventcard"}
                >
                <img
                src={image}
                alt={"Departments"}
                />
            </div>
        </>
    )
}
export default EventCard;
