import React from "react";
import { isAuthenticated } from "./services/auth";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Cartoes from './pages/Cartoes'
import Objetivos from './pages/Objetivos'
import Categorias from "./pages/Categorias";
import Estabelecimentos from "./pages/Estabelecimentos";
import Movimentacoes from "./pages/Movimentacoes";

const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const RoutesInNav = () =>  (
   <Switch>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/cartoes" component={Cartoes}/>
    <Route exact path="/objetivos" component={Objetivos}/>
    <Route exact path="/categorias" component={Categorias}/>
    <Route exact path="/estabelecimentos" component={Estabelecimentos}/>
    <Route exact path="/movimentacoes" component={Movimentacoes}/>
    <Route path="*" component={NotFound} />
  </Switch>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <LoginRoute exact path="/" component={Login} />
      <LoginRoute path="/signup" component={SignUp} />
      <PrivateRoutes path="*" component={() => <Navbar RoutesInNav={RoutesInNav}/>}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;
