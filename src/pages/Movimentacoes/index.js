import React, { Component } from "react";
import Table from "../Table";
import api from "../../services/api";

export default function Movimentacoes(){
 
  const [columns, setColumns] = React.useState([]);
    console.log(columns.length);
   if(columns.length == 0){  
    api
      .get("/cartoes")
      .then((response) => response.data)
      .then((results) => {
        var objects = {};
        results.content.forEach(function(result){
          var codigo = result._id;
          var nome = result.nome;
          var object = {};
          objects[codigo] = nome;
        })
        api
          .get("/estabelecimentos")
          .then((response) => response.data)
          .then((resultsEst) => {
            var objectsEst = {};
            resultsEst.content.forEach(function(result){
              var codigo = result._id;
              var nome = result.nome;
              var object = {};
              objectsEst[codigo] = nome;
            })
            setColumns([
              { title: "Nome", field: "nome" },
              { title: "Descrição", field: "descricao" },
              { title: 'Valor', field: 'valor', type: 'currency', currencySetting: {locale: 'pt-BR', currencyCode: 'BRL'}},
              { title: "Data", field: "data", type: 'datetime'},
              {
                title: 'Tipo',
                field: 'tipo',
                lookup: { ACRESCIMO: 'Acréscimo', DECRESCIMO: 'Decréscimo' },
              },
              {
                title: "Cartão",
                field: "cartao",
                lookup: objects,
              },
              {
                title: "Estabelecimento",
                field: "estabelecimento",
                lookup: objectsEst,
              }
            ]);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
      <Table
        named="Movimentacões"
        resource="/movimentacoes"
        columns={columns}
      />
      );
}

