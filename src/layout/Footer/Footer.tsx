import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => (
  <footer>
    <small>
      Data and images are retrieved from
      <a href="https://thecatapi.com/" target="_blank" rel="noreferrer">
        <img
          alt="The Cat API logo"
          src="https://thecatapi.com/_app/immutable/assets/thecatapi-logo.78868573.svg"
        />
      </a>
      .
    </small>
  </footer>
);

export default Footer;
