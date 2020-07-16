import React from 'react';
import clsx from 'clsx';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { mainListItems, titleDrawer } from './listItems';
import { BrowserRouter, Route, useLocation } from "react-router-dom"
import { UseStyles, getTheme } from './styles';
import { logout } from "../../services/auth";

import Logo from "../../assets/money.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="localhost:3001">
        Financee
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Navbar(props) {
  const classes = UseStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = React.useState('Dashboard');

  const location = useLocation();

  React.useEffect(() => {
    console.log('Location changed');
  }, [location]);
    
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar, classes.mainColor}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {title}
          </Typography>
          <IconButton color="inherit" onClick={logout} href='/'>
              <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <img src={Logo} className={classes.logo} alt="Financee" />
            <h1 className={classes.logoName}>FINANCEE</h1>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems(setTitle)}</List>
        </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth="lg" className={classes.container}>
              <MuiThemeProvider theme={getTheme}>
                {props.RoutesInNav()}
              </MuiThemeProvider>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
      </BrowserRouter>
    </div>
  );
}