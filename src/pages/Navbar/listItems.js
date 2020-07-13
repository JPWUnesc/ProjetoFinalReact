import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExploreIcon from '@material-ui/icons/Explore';
import CategoryIcon from '@material-ui/icons/Category';
import StoreIcon from '@material-ui/icons/Store';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link } from "react-router-dom";

export var titleDrawer = 'Dashboard';

export function mainListItems(onClickItem) {
  return (
    <div>
      <ListItem button onClick={() => onClickItem("Dashboard")} component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => onClickItem("Orders")} component={Link} to="/movimentacoes">
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Movimentações" />
      </ListItem>
      <ListItem button onClick={() => onClickItem("Estabelecimentos")} component={Link} to="/estabelecimentos">
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Estabelecimentos" />
      </ListItem>
      <ListItem button onClick={() => onClickItem("Categorias")} component={Link} to="/categorias">
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categoria" />
      </ListItem>
      <ListItem button onClick={() => onClickItem("Objetivos")} component={Link} to="/objetivos">
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Objetivos" />
      </ListItem>
      <ListItem button onClick={() => onClickItem("Cartões")} component={Link} to="/cartoes">
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Cartões" />
      </ListItem>
    </div>
  );
}