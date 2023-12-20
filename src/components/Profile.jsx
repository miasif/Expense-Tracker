import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { auth } from "../config/firebase-config";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Profile = () => {
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
  const handleRedirect = () => {
    // Replace the following line with your actual logic for redirection
    navigate("/transactions");
  };
  return (
    <>
      <Container>
        <h1 className="text-center mb-4">{name}'s Expense Tracker</h1>
        {profilePhoto && (
          <Container className="mt-3">
            <Row className="justify-content-md-center mb-3 ">
              <Col md="auto">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-circle"
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Button onClick={signUserOut}>Sign Out</Button>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
};
export default Profile;
