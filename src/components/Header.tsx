import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "styles/Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header-container">
          <div className="header-logo d-flex">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                height={34}
                alt="Logo"
                className="header-logo-img"
              />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
