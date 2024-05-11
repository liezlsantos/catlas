import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage: React.FC = () => (
  <div className="not-found-page">
    <div className="wrapper">
      <h1>404 - Page Not Found</h1>
      <div className="sub-text">
        Please make sure you input the correct address in your browser.
      </div>
      <Link to="/">Go back to Home.</Link>
    </div>
  </div>
);

export default NotFoundPage;
