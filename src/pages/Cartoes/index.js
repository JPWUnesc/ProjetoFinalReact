import React from 'react';
import Table from '../Table'


export default function Cartoes(){
  const columns = [
    { title: 'Nome', field: 'nome' },
    { title: 'Descrição', field: 'descricao' },
    { title: 'Número', field: 'numero', type: 'numeric' },
    {
      title: 'Modalidade',
      field: 'modalidade',
      lookup: { CREDITO: 'Crédito', DEBITO: 'Débito' },
    },
  ];
  return (
    <Table named="Cartões" resource="/cartoes" columns={columns} />
  );
}
