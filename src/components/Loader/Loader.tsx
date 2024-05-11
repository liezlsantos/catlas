import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loader.scss";

const Loader: React.FC = () => (
  <div className="loader">
    <div>
      <Spinner animation="border" role="status"></Spinner>
    </div>
    <div>Loading...</div>
  </div>
);

export default Loader;
