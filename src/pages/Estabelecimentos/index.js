import React, { Component } from "react";
import Table from "../Table";
import api from "../../services/api";

export default function Estabelecimentos(){
 
  const [columns, setColumns] = React.useState([]);

   if(columns.length == 0){   
    api
      .get("/tiposEstabelecimento")
      .then((response) => response.data)
      .then((results) => {
        var objects = {};
        results.content.forEach(function(result){
          var codigo = result._id;
          var nome = result.nome;
          var object = {};
          objects[codigo] = nome;
        })
        setColumns([
          { title: "Nome", field: "nome" },
          { title: "Descrição", field: "descricao" },
          {
            title: "Categoria",
            field: "tipoEstabelecimento",
            lookup: objects,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    return (
      <Table
        named="Estabelecimentos"
        resource="/estabelecimentos"
        columns={columns}
      />
      );
}

