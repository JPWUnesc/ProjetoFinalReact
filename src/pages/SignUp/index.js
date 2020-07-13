import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../../services/auth";

import Logo from "../../assets/money.png";

import { Form, Container } from "./styles";
import api from "../../services/api";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      api.post("/auth/register", { email, password }).then(response =>{
        login(response.data.content.token);
        this.props.history.push("/app");
      }).catch(err=>{
        var error = "Ocorreu um erro ao registrar sua conta.";
        if(err.response){
          error = err.response.data.message;
        }
        this.setState({
          error: error
        });
      });
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Financee" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default SignUp;