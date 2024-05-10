import React from "react";
import "styles/Footer.scss";

const Footer: React.FC = () => (
  <footer>
    Data and images are retrieved from
    <a href="https://thecatapi.com/" target="_blank" rel="noreferrer">
      <img
        height={20}
        alt="The Cat API logo"
        src="https://thecatapi.com/_app/immutable/assets/thecatapi-logo.78868573.svg"
      ></img>
    </a>
    .
  </footer>
);

export default Footer;
