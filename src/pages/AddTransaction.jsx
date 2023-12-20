import React from "react";
import { Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";

function AddTransaction() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container fluid className="h-100">
        {/* Form */}
        <Row className="justify-content-center mt-5">
          <Col md="6" className="mt-3">
            <Form />
          </Col>
          {/* No need for "Add Category" Button */}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default AddTransaction;
