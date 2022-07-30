import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
const Login = () => {
  const adminEmail = "admin";
  const adminPassword = "abcd@1234";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = async (e) => {
    e.preventDefault();
    console.log("Hello from login");
    if (email === adminEmail && password === adminPassword) {
      window.alert("Welcome Admin");
      navigate("/admin");
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

      const data = res.json();

      if (data.status === 401 || !data) {
        window.alert("INVALID");
      } else {
        window.alert("SUCCESS");
        navigate("/");
      }
    }
  };

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form method="POST" onSubmit={PostData}>
            <Form.Input
              icon="user"
              iconPosition="left"
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="passowrd"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button content="Login" primary />
          </Form>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Button content="Sign up" icon="signup" size="big"></Button>
        </Grid.Column>
      </Grid>
      <Divider vertical>Or</Divider>
    </Segment>
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
