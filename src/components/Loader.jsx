// Loader.jsx
import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
};

export default Loader;
