import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./Layout.scss";

const Layout: React.FC = () => (
  <Container className="app">
    <Header />
    <Outlet />
    <Footer />
  </Container>
);

export default Layout;
