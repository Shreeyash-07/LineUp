import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Signup2.scss";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import logoImg from "./3.png";
// import "./Signup2.css";

const Singup2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password, phone } = user;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("INVALID");
    } else {
      window.alert("SUCCESS");
      navigate("/login");
    }
  };
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const toggleIsPasswordShowValue = (e) => {
    e.preventDefault();
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <>
      <div className="login">
        <div className="container login__content">
          {/* <div className="login__img"><img src={logoImg} alt="" /></div> */}

          <form action="" className="login__create new" id="login-up">
            <h1 className="login__title">Create Account</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="Username"
                className="login__input"
              />
            </div>

            <div className="login__box">
              <i className="bx bx-at login__icon"></i>
              <input type="text" placeholder="Email" className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                className="login__input"
              />
            </div>

            <div className="login__box">
              <i className="bx bx-phone login__icon"></i>
              <input
                type="number"
                placeholder="Contact No"
                className="login__input"
              />
            </div>

            <a href="#" className="login__button">
              Sign Up
            </a>

            <div>
              <span className="login__account">Already have an Account? </span>
              <NavLink to="/login">
                <span className="login__signup" id="sign-in">
                  Sign In
                </span>
              </NavLink>
              <br />
            </div>

            {/* <div className="login__social">
                <a href="#" className="login__social-icon"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="login__social-icon"><i className='bx bxl-twitter'></i></a>
                <a href="#" className="login__social-icon"><i className='bx bxl-google'></i></a>
              </div> */}
          </form>
        </div>
      </div>
    </>
  );
};
export default Singup2;
