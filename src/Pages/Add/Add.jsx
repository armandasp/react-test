import React, { useState, useContext } from "react";
import { Nav, Form, Button } from "../../Components";
// import { Link } from "react-dom";
import { AuthContext } from "../../Contexts/Auth";

const links = [
  { title: "Home", to: "/" },
  { title: "Add", to: "/add" },
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

const Add = () => {
  const [skillInputs, setSkillInputs] = useState();
  const authContext = useContext(AuthContext);
  const inputs = [
    {
      type: "text",
      placeholder: "title...",
      handleChange: (e) =>
        setSkillInputs({
          ...skillInputs,
          title: e.target.value.trim(),
        }),
    },
    {
      type: "text",
      placeholder: "description...",
      handleChange: (e) =>
        setSkillInputs({
          ...skillInputs,
          description: e.target.value.trim().toLowerCase(),
        }),
    },
  ];
  return (
    <div>
      <Nav links={links} />
      <Form
        handleSubmit={(e) => {
          e.preventDefault();

          fetch(`${process.env.REACT_APP_API_URL}/v1/content/skills`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${authContext.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(skillInputs),
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.msg) {
                alert("this error");
                return console.log(data.msg);
              }
              alert(data.msg);
            })
            .catch((err) => alert("this error"))
            .finally(() => e.target.reset());
        }}
        title="Add skill"
        inputs={inputs}
      >
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Add;
