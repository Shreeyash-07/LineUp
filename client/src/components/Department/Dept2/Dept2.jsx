import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { NavLink } from 'react-router-dom';



const Dept2 = () => {
    return (
        <>
            <Navbar />
            <h2 className='text-center'>Our Doctors</h2>
            <div className="container">
                <div className="row" style={{
                    "display": "flex",
                    "justify-content": "space-around",
                    "margin-top": "65px"
                }}>
                    <div className="card col-sm-12 col-md-6 col-lg-4" style={{ width: "18rem", height: "15rem" }}>
                        {/* <img src="..." className="card-img" /> */}
                        <div className="card-body">
                            <h5 className="card-title">Doctor 1</h5>
                            <p className="card-text">make up the bulk of the card's content.</p>
                            <NavLink to="/doc1" className="btn btn-primary">Check Info</NavLink>
                        </div>
                    </div>

                    <div className="card col-sm-12 col-md-6 col-lg-4" style={{ width: "18rem", height: "15rem" }}>
                        {/* <img src="..." className="card-img" /> */}
                        <div className="card-body">
                            <h5 className="card-title">Doctor 2</h5>
                            <p className="card-text">make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

                    <div className="card col-sm-12 col-md-6 col-lg-4" style={{ width: "18rem", height: "15rem" }}>
                        {/* <img src="..." className="card-img" /> */}
                        <div className="card-body">
                            <h5 className="card-title">Doctor 3</h5>
                            <p className="card-text">make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dept2