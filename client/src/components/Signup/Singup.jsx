import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import { fetchToken } from "../../firebase-config";

const Singup = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
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
    if (data.status === 422 || !data) {
      window.alert("INVALID");
    } else {
      window.alert("SUCCESS");
      navigate("/login");
    }
  };
  return (
    <div className="details">
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
