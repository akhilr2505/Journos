import React from 'react'
import {Navbar, Nav, Container} from "react-bootstrap"
import { useUserAuth } from "../context/UserAuthContext";


const Analysis = () => {
    const {  user } = useUserAuth();

  return (
    <div>
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
    </div>
  )
}

export default Analysis