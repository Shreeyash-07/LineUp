import React from 'react';
import Navbar from '../../Navbar/Navbar';



const Dept2 = () => {
    return (
        <>
            <Navbar />
            <h2 className='text-center'>Our Doctors</h2>
            <div className="mx-3 my-3" style={{
                display: "flex",
                "align-content": "stretch",
                "justify-content": "space-evenly"
            }}>
                <div className="card DeptCard" style={{ width: "18rem", height: "15rem" }}>
                    {/* <img src="..." className="card-img" /> */}
                    <div className="card-body">
                        <h5 className="card-title">Doctor 1</h5>
                        <p className="card-text">make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div className="card DeptCard" style={{ width: "18rem", height: "15rem" }}>
                    {/* <img src="..." className="card-img" /> */}
                    <div className="card-body">
                        <h5 className="card-title">Doctor 2</h5>
                        <p className="card-text">make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div className="card DeptCard" style={{ width: "18rem", height: "15rem" }}>
                    {/* <img src="..." className="card-img" /> */}
                    <div className="card-body">
                        <h5 className="card-title">Doctor 3</h5>
                        <p className="card-text">make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dept2