import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Container from "react-bootstrap/Container";

const Layout: React.FC = () => (
  <Container className="App">
    <Header />
    <Outlet />
    <Footer />
  </Container>
);

export default Layout;
