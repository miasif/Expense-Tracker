import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { signOut } from "firebase/auth";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { auth } from "../config/firebase-config";
import "./header.css";

function Header({ onSignOut }) {
  const navigate = useNavigate();
  const { name, profilePhoto } = useGetUserInfo();
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar style={{ backgroundColor: "#b8ecf2" }} variant="dark">
      <Container>
        {/* Use Link for navigation */}
        <Link
          to="/expense-tracker"
          className="nav-link-brand "
          // style={{ color: "black"}}
        >
          Daily Expenses
        </Link>

        <Nav className="ms-auto d-flex justify-content-center align-items-center">
          <Nav.Link href="#deets">
            <img
              src={profilePhoto}
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "28px" }}
            />
          </Nav.Link>

          <Nav.Link href="/" className="custom-btn">

          <Link to="/" className="nav-link " onClick={signUserOut}>
            Logout
          </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
