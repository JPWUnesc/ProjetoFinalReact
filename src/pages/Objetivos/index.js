import React from 'react';
import Table from '../Table'


export default function Objetivos(){
  const columns = [
    { title: 'Nome', field: 'nome' },
    { title: 'Descrição', field: 'descricao' },
    { title: 'Valor', field: 'valor', type: 'currency', currencySetting: {locale: 'pt-BR', currencyCode: 'BRL'}}
  ];
  return (
    <Table named="Objetivos" resource="/objetivos" columns={columns} />
  );
}
