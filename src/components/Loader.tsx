import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader: React.FC = () => (
  <div className="my-4 loader d-flex flex-column justify-content-center align-items-center">
    <div>
      <Spinner animation="border" role="status"></Spinner>
    </div>
    <div>Loading...</div>
  </div>
);

export default Loader;
