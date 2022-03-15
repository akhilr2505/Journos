import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Notes from "./Notes";
import "./Home.css";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="home">
      <div className="userDetails">Username: {user.email}</div>
      {console.log(user.email)}
      <div className="logoutButton">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <div className="notes">
        <Notes />
      </div>
    </div>
  );
};

export default Home;
