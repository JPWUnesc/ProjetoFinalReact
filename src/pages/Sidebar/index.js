import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import { Container } from "./styles";

import Dashboard from '../Navbar';
 
class Sidebar extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  };


  render() {
    return (
      <Container>
        <h1>Side</h1>
      </Container>
    );
  }
}

export default Sidebar;