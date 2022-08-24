import React from "react";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
// import { useCookies } from "react-cookie";
import './Login.scss'

const Login = () => {
  const adminEmail = "admin";
  const adminPassword = "abcd@1234";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(true);






  const PostData = async (e) => {
    e.preventDefault();
    setError(false);
    console.log("Hello from login");
    if (email === adminEmail && password === adminPassword) {
      window.alert("Welcome Admin");
      // {(isAppointmentBooked) ? navigate("/home"): navigate("/slots")}
      // navigate("/admin")
    } else {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log({ loginsuccess: data });
      if (data.success === false || !data) {
        setError(true);
        return;
      } else {
        isAppointmentBooked ? navigate("/home"): navigate("/slots")
      }
    }
  };

  return (
    <div className="container-fluid main-container m-auto shadow p-3 rounded newlogin">
      <div className="text-center p-3 ">
        <h1>Login</h1>
      </div>
      {error && (
        <div class="alert alert-danger" role="alert">
          Login failed, Incorrect Credentials
        </div>
      )}
      <form>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ fontFamily: "inherit", border: "none" }}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                fontFamily: "inherit",
                border: "none",
              }}
            />
          </div>
        </div>

        <div className="text-center">
          <NavLink to="/signup">New User?Register here</NavLink>
          <br />
          <button
            type="submit"
            className="btn btn-primary m-3"
            name="login"
            id="login"
            value="submit"
            onClick={PostData}
            style={{ fontFamily: "inherit" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

{
  /* <form method="POST">
  Email:
  <input
    type="email"
    name="email"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <br />
  Password:
  <input
    type="password"
    name="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <input type="submit" value="submit" onClick={PostData} />
</form>; */
}
