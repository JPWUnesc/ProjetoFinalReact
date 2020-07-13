import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../config/tableIcons';
import api from "../../services/api";
import { Alert } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { useStyles } from './styles'

function getData(query){
  return new Promise((resolve, reject) => {
    var url = "/cartoes?";
    url += 'limit=' + query.pageSize
    url += '&offset=' + query.page == 0 ? 0 : (query.page + 1) * query.pageSize
    api.get(url)
    .then(response=>response.data)
    .then(result => {
          resolve({
                    data: result.content,
                    page: result.actualPage,
                    totalCount: result.total
                  });
        }).catch(err=>{
          console.log(err);
          return [];
        })
      });
}

function addData(data){
  return new Promise((resolve, reject) => {
    api.post('/cartoes', data)
    .then(response=>response.data)
    .then(result => {
          if(result.success){
            resolve();
          }
        }).catch(err=>{
          console.log(err);
          return [];
        })
      });
}

function updateData(id, data){
  return new Promise((resolve, reject) => {
    api.put('/cartoes/' + id, data)
    .then(response=>response.data)
    .then(result => {
          if(result.success){
            resolve();
          }
        }).catch(err=>{
          console.log(err);
          return [];
        })
      });
}

function removeData(id){
  return new Promise((resolve, reject) => {
    api.delete('/cartoes/' + id)
    .then(response=>response.data)
    .then(result => {
          if(result.success){
            resolve();
          }
        }).catch(err=>{
          console.log(err);
          return [];
        })
      });
}

export default function Cartoes() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome', field: 'nome' },
      { title: 'Descrição', field: 'descricao' },
      { title: 'Número', field: 'numero', type: 'numeric' },
      {
        title: 'Modalidade',
        field: 'modalidade',
        lookup: { CREDITO: 'Crédito', DEBITO: 'Débito' },
      },
    ]
  });

  
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
      <Snackbar open={alert} autoHideDuration={6000}>
        <Alert variant="outlined" severity="warning">
          {message}
        </Alert>
      </Snackbar>
      <MaterialTable
        title="Cartões"
        columns={state.columns}
        icons={tableIcons}
        data={query => getData(query)}
        editable={{
          onRowAdd: (newData) => addData(newData),
          onRowUpdate: (newData, oldData) => updateData(oldData._id, newData),
          onRowDelete: (oldData) => removeData(oldData._id),
        }}
      />
    </Paper>
  </Grid>
  );
}
