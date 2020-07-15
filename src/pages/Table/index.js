import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../config/tableIcons';
import api from "../../services/api";
import { Alert } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { useStyles } from './styles'

const messageTypes = {
    SUCCESS: 'success',
    ERROR: 'error'
}

export default function Table(props) {
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    messageType: messageTypes.SUCCESS,
  });


  const classes = useStyles();

  function getData(query){
    return new Promise((resolve, reject) => {
      console.log(query);
      var url = props.resource + "?";
      url += 'limit=' + query.pageSize;
      url += '&offset=' + (!query.page ? 0 : (query.page  * query.pageSize))
      if(query.orderBy){
        url += '&order=' + (query.orderDirection == 'desc' ? '-' : '') + query.orderBy.field;
      }
      if(query.search){
        url += '&search=' + query.search; 
      }
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
      api.post(props.resource, data)
      .then(response=>response.data)
      .then(result => {
            setAlert({
              open: true,
              message: result.message,
              messageType: messageTypes.SUCCESS,
            });
            resolve();
          }).catch(err=>{
            if(err.response){
              setAlert({
                open: true,
                message: err.response.data.message,
                messageType: messageTypes.ERROR,
              });
            }
            resolve();
          })
        });
  }

  function updateData(id, data){
    return new Promise((resolve, reject) => {
      api.put(props.resource + '/' + id, data)
      .then(response=>response.data)
      .then(result => {
            setAlert({
              open: true,
              message: result.message,
              messageType: messageTypes.SUCCESS,
            });
            resolve();
          }).catch(err=>{
            if(err.response){
              setAlert({
                open: true,
                message: err.response.data.message,
                messageType: messageTypes.ERROR,
              });
            }
            resolve();
          })
        });
  }

  function removeData(id){
    return new Promise((resolve, reject) => {
      api.delete( props.resource + '/' + id)
      .then(response=>response.data)
      .then(result => {
            setAlert({
              open: true,
              message: result.message,
              messageType: messageTypes.SUCCESS,
            });
            resolve();
          }).catch(err=>{
            if(err.response){
              setAlert({
                open: true,
                message: err.response.data.message,
                messageType: messageTypes.ERROR,
              });
            }
            resolve();
          })
        });
  }

  var localization={ body: { 
                        editRow: 
                        { 
                          deleteText: 'Tem certeza que deseja remover?',
                          cancelTooltip: 'Cancelar',
                          saveTooltip: 'Salvar'
                        },
                        emptyDataSourceMessage: 'Vazio',
                        addTooltip: 'Adicionar',
                        deleteTooltip: 'Remover',
                        editTooltip: 'Editar'
                      },
                      pagination: {
                        labelRowsSelect: 'Colunas',
                        labelDisplayedRows : '{from}-{to} de {count}',
                        previousAriaLabel: 'Pagina anterior',
                        previousTooltip: 'Pagina anterior',
                        nextAriaLabel: 'Proxima pagina',
                        nextTooltip: 'Proxima pagina',
                        lastAriaLabel: 'Ultima pagina',
                        lastTooltip: 'Ultima pagina',
                        firstAriaLabel: 'Primeira pagina',
                        firstTooltip: 'Primeira pagina',
                        labelRowsPerPage: 'Linhas por pagina'
                      },
                      toolbar:{
                        searchTooltip: 'Buscar',
                        searchPlaceholder: 'Buscar'
                      }
                    };

  return (
    <Grid item xs={12}>
    <Snackbar open={alert.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert severity={alert.messageType}>
        {alert.message}
      </Alert>
    </Snackbar>
      <MaterialTable
        title={props.named}
        columns={props.columns}
        icons={tableIcons}
        data={query => getData(query)}
        localization= {localization}
        style= {{padding: 20}}
        editable={{
          onRowAdd: (newData) => addData(newData),
          onRowUpdate: (newData, oldData) => updateData(oldData._id, newData),
          onRowDelete: (oldData) => removeData(oldData._id),
        }}
      />
  </Grid>
  );
}
