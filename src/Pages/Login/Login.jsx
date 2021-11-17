import React, { useState, useContext } from "react";
import { Nav, Button, Form } from "../../Components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/Auth";
import { useNavigate } from "react-router-dom";

const links = [
  { title: "Register", to: "/register" },
  { title: "Login", to: "/login" },
];

const Login = () => {
  const [userInputs, setUserInputs] = useState();
  const navigate = useNavigate();

  const inputs = [
    {
      type: "email",
      placeholder: "example@email.com",
      handleChange: (e) =>
        setUserInputs({
          ...userInputs,
          email: e.target.value.trim().toLowerCase(),
        }),
    },
    {
      type: "password",
      placeholder: "password...",
      handleChange: (e) =>
        setUserInputs({ ...userInputs, password: e.target.value }),
    },
  ];

  const authContext = useContext(AuthContext);
  return (
    <>
      <Nav links={links}></Nav>
      <Form
        handleSubmit={(e) => {
          e.preventDefault();

          fetch(`${process.env.REACT_APP_API_URL}/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInputs),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.msg !== "Successfully logged in" || !data.token) {
                return alert(data.err);
              }
              alert("Successfully logged in");
              authContext.setToken(data.token);
              navigate("/");
              // <useNavigate replace to="/" />;
            })
            .catch((err) => alert(err.message))
            .finally(() => e.target.reset());
        }}
        title="Login"
        inputs={inputs}
      >
        <Button color="primary" type="submit">
          Login
        </Button>
        <p>
          Don`t have an account? <Link to="/register">Register</Link>
        </p>
      </Form>
    </>
  );
};

export default Login;
