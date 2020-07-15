import React from 'react';
import Table from '../Table'


export default function Categorias(){
  const columns = [
    { title: 'Nome', field: 'nome' },
    { title: 'Descrição', field: 'descricao' },
  ];
  return (
    <Table named="Categorias" resource="/tiposEstabelecimento" columns={columns} />
  );
}
