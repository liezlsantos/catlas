import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

const Layout: React.FC = () => (
  <Container className="App">
    <ScrollRestoration />
    <Header />
    <Outlet />
    <Footer />
  </Container>
);

export default Layout;
