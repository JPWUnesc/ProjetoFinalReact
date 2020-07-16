import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

import Logo from "../../assets/money.png";

import { Form, Container } from "./styles";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  
  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      api.post("/auth/authenticate", { email, password }).then(response =>{
        login(response.data.content.token);
        this.props.history.push("/");
      }).catch(err=>{
        console.log(err);
        var error = "Houve um problema com o login, verifique suas credenciais.";
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
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Financee" />
          {this.state.error && <p>{this.state.error}</p>}
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
          <button type="submit">Login</button>
          <hr />
          <Link to="/signup">Cadastrar</Link>
        </Form>
      </Container>
    );
  }
}

export default Login;