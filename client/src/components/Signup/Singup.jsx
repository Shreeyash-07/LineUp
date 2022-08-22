import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import { fetchToken } from "../../firebase-config";

const Singup = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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
    fetchToken(setTokenFound, setFcmToken);
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        fcmToken,
      }),
    });

    const data = await res.json();
    if (data.success === false || !data) {
      setError(true);
      return;
    } else {
      navigate("/login");
    }
  };
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const toggleIsPasswordShowValue = (e) => {
    e.preventDefault();
    setIsPasswordShow(!isPasswordShow);
  };
  return (
    <div className="container-fluid main-container m-auto shadow p-3 rounded">
      <div class="text-center m-3">
        <h1>Sign Up</h1>
      </div>
      {error && (
        <div class="alert alert-danger" role="alert">
          Signup failed, Email already exist
        </div>
      )}
      <form>
        <div className="row mb-3">
          <label
            htmlFor="name"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "15px", fontWeight: "800" }}
          >
            Name:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputs}
              placeholder="Name"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="email"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "15px", fontWeight: "800" }}
          >
            Email:
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              placeholder="Email"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="password"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "15px", fontWeight: "800" }}
          >
            Password:
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
              style={{ fontFamily: "inherit" }}
            ></input>
            {/* <button className="eye-icon" onClick={toggleIsPasswordShowValue}>
              {isPasswordShow ? (
                <i class="bi bi-eye-fill"></i>
              ) : (
                <i class="bi bi-eye-slash-fill"></i>
              )}
            </button> */}
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="password"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "15px", fontWeight: "800" }}
          >
            Phone:
          </label>
          <div className="col-sm-9">
            <input
              type="phone"
              className="form-control"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleInputs}
              placeholder="Phone"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        </div>
        <div className="text-center">
          <NavLink to="/login">Already a User?Login here</NavLink>
          <br />
          <button
            type="submit"
            className="btn btn-primary m-3"
            name="signup"
            id="signup"
            style={{ fontFamily: "inherit" }}
            onClick={postData}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Singup;

{
  /* <div className="details">
  <form method="POST">
    Name:
    <input
      type="text"
      id="name"
      name="name"
      value={user.name}
      onChange={handleInputs}
      placeholder="Name"
    />
    <br />
    Email:
    <input
      type="email"
      id="email"
      name="email"
      value={user.email}
      onChange={handleInputs}
      placeholder="Email"
    />
    <br />
    Password:
    <input
      type="password"
      id="password"
      name="password"
      value={user.password}
      onChange={handleInputs}
      placeholder="Password"
    />
    <br />
    Phone:
    <input
      type="text"
      id="phone"
      name="phone"
      value={user.phone}
      onChange={handleInputs}
      placeholder="Phone"
    />
    <br />
    <input type="submit" name="signup" id="signup" onClick={postData} />
  </form>
</div>; */
}
