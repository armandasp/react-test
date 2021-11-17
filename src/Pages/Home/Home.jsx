import React, { useContext, useState, useEffect } from "react";
import { Nav, Block } from "../../Components";
import * as S from "./Home.styles";
import { AuthContext } from "../../Contexts/Auth";

const links = [
  { title: "Home", to: "/" },
  { title: "Add", to: "/add" },
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

const Home = () => {
  const authContext = useContext(AuthContext);
  const [items, setItems] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/content/skills`, {
      headers: {
        authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return alert("this error");
        }
        setItems(data);
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <>
      <Nav links={links}></Nav>

      {!items && <h1>Loading...</h1>}

      {items && items.length === 0 && <h1>You have no added skills</h1>}

      {items && (
        <S.SectionStyle className="blocks">
          <Block blocks={items} />
        </S.SectionStyle>
      )}
    </>
  );
};

export default Home;
