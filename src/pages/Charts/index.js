import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Title from '../Title';
import api from "../../services/api";

// Generate Sales Data
function createData(day, month, year, acressimos, decressimos) {
  month = monthNames[month - 1];
  var data = '';
  if(day){
    data += day + '/'; 
  }
  data += month + '/';
  data += year;
  return {
            name: data, acr: acressimos, dec: decressimos,
        };
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

export default function Chart(props) {
  const theme = useTheme();

  const [data, setData] = React.useState([]);
  if(data.length == 0){
        api
            .get("/movimentacoes/graph?by=" + (props.month ? 'month' : 'day'))
            .then((response) => response.data)
            .then((results) => {
            var objects = [];
            results.content.forEach(function(result){
                objects.push(createData(result._id.day, result._id.month, result._id.year, result.acresimo, result.decrescimo));
            })
            setData(objects);
            })
            .catch((err) => {
            console.log(err);
        });
    }
    
  
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="acr" stroke="#8884d8" />
            <Line type="monotone" dataKey="dec" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}