import React, { Component } from "react";
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Form, Container } from "./styles";
import { UseStyles } from '../Navbar/styles'
import Chart from '../Charts';
import Carteira from '../Carteira';

export default function Dashboard() {
  const classes  = UseStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart  title='Mensal'/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Carteira />
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={fixedHeightPaper}>
            <Chart month={true} title='Anual' />
          </Paper>
        </Grid>
      </Grid>
    );
}