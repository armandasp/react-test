import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Add } from "./Pages";
import PrivateRouter from "./Components/PrivateRouter";

const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />
        <Route
          exact
          path="/add"
          element={
            <PrivateRouter>
              <Add />
            </PrivateRouter>
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default PageRouter;
