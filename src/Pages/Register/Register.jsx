import React, { useState } from "react";
import { Nav, Button, Form } from "../../Components";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";

const links = [
  { title: "Register", to: "/register" },
  { title: "Login", to: "/login" },
];

const Register = () => {
  const [userInputs, setUserInputs] = useState();
  console.log(process.env.REACT_APP_API_URL);
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
  return (
    <>
      <Nav links={links}></Nav>
      <Form
        handleSubmit={(e) => {
          e.preventDefault();
          console.log(userInputs);
          fetch(`${process.env.REACT_APP_API_URL}/v1/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInputs),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.err) {
                alert(data.err);
              }
              alert("Registration successfull");
            })
            .catch((err) => alert(err))
            .finally(() => {
              e.target.reset();
              <Navigate replace to="/login" />;
            });
        }}
        title="Register"
        inputs={inputs}
      >
        <Button color="primary" type="submit">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </>
  );
};

export default Register;
