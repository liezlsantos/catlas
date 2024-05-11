import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header-logo">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="CATLAS Logo"
              className="header-logo-img"
            />
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
