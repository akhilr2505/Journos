import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Entries from "./Entries";
import Journal from "./Journal";
import "./Home.css";
import {Navbar, Nav, Container} from "react-bootstrap"


const Home = () => {
  const { logOut, user } = useUserAuth();
  var id=user.email;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return ( <>
    <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/analysis">Analysis</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/login">{user.email}</a>
            </Navbar.Text>
          </Navbar.Collapse>

          </Container>
        </Navbar>
    <div className="home">
      {/* <div className="top">
        
      </div> */}

      <div className="main">
        <div className="entries">
          <Entries />
        </div>
        <div className="journal">
          <Journal />
        </div>
        
      </div>
      <div className="logoutButton">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
    </div>
    </>

  );
};

export default Home;
