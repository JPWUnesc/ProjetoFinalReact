import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../../services/auth";

import Logo from "../../assets/money.png";

import { Form, Container } from "./styles";
import api from "../../services/api";

import Confused from '../../assets/404.gif'


class NotFound extends Component {

  render() {
    return (
        <Container>
          <h1>4</h1>
          <img src={Confused} alt='Pagina não encontrada'/>
          <h1>4</h1>
        </Container>
    );
  }
}

export default NotFound;