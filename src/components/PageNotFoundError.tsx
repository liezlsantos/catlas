import React from "react";
import { Link } from "react-router-dom";

const PageNotFoundError: React.FC = () => (
  <div className="d-flex flex-column flex-grow-1">
    <div className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
      <h1>404 - Page Not Found</h1>
      <div className="mt-2">
        Please make sure you input the correct address in your browser.
      </div>
      <Link to="/">Go back to Home.</Link>
    </div>
  </div>
);

export default PageNotFoundError;
