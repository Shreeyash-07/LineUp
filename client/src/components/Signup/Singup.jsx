import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const Singup = () => {
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
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form method="POST" onSubmit={postData}>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              placeholder="Username"
              value={user.name}
              onChange={handleInputs}
            />
            <Form.Input
              icon="mail"
              iconPosition="left"
              type="email"
              label="Email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputs}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="passowrd"
              label="Password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputs}
            />
            <Form.Input
              icon="phone"
              iconPosition="left"
              type="phone"
              label="Phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleInputs}
            />
            <Button content="Sign Up" primary />
          </Form>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Button content="Log In" icon="signup" size="big"></Button>
        </Grid.Column>
      </Grid>
      <Divider vertical>Or</Divider>
    </Segment>
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
