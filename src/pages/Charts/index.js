import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Title from '../Title';
import api from "../../services/api";
import sort from '../../services/sort'

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

function mysortFunctionByMonth(a, b) {

  var o1 = a[3].toLowerCase();
  var o2 = b[3].toLowerCase();

  var p1 = a[1].toLowerCase();
  var p2 = b[1].toLowerCase();

  if (o1 < o2) return -1;
  if (o1 > o2) return 1;
  if (p1 < p2) return -1;
  if (p1 > p2) return 1;
  return 0;
}

export default function Chart(props) {
  const theme = useTheme();

  const [data, setData] = React.useState([]);
  const [request, setRequest] = React.useState(false);
  if(!request){
        api
            .get("/movimentacoes/graph?by=" + (props.month ? 'month' : 'day'))
            .then((response) => response.data)
            .then((results) => {
            var objects = [];
            results.content
            .sort(
              function(a, b) {          
                if (a._id.year === b._id.year) {
                   if(a._id.month === b._id.month){
                     return b._id.day < a._id.day ? 1 : -1;
                   }
                   return a._id.month > b._id.month ? 1 : -1;
                }
                return a._id.year > b._id.year ? 1 : -1;
             }
            )
            .forEach(function(result){
                objects.push(createData(result._id.day, result._id.month, result._id.year, result.acresimo, result.decrescimo));
            })
            setData(objects);
            setRequest(true);
            })
            .catch((err) => {
            setRequest(true);
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