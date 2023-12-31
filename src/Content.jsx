import axios from "axios";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useState, useEffect } from "react";
import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";

export function Content() {
  const [visits, setVisits] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.jwt !== undefined);

  const handleIndexVisits = () => {
    axios.get("http://localhost:3000/visits.json").then((response) => {
      setVisits(response.data);
    });
  };

  let homePage;
  if (!userLoggedIn) {
    homePage = (
      <div>
        <Signup />
        <Login setUserLoggedIn={setUserLoggedIn} />
      </div>
    );
  } else {
    homePage = (
      <div>
        <Home visits={visits} />
      </div>
    );
  }

  useEffect(() => {
    if (userLoggedIn) {
      handleIndexVisits();
    }
  }, [userLoggedIn]);
  return (
    <Routes>
      <Route path="/" element={homePage} />
    </Routes>
  );
}