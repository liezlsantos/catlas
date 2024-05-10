import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "styles/Header.scss";

const Header: React.FC = () => (
  <header className="header">
    <Container>
      <div className="header-container">
        <div className="header-logo d-flex">
          <Link to="/">
            <img
              src="/logo.png"
              height={40}
              alt="Logo"
              className="header-logo-img"
            ></img>
          </Link>
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
