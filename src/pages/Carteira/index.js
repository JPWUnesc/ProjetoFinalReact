import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import api from "../../services/api";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Carteira() {
  const classes = useStyles();
  var today  = new Date();
  const [valor, setValor] = React.useState(0);
  const [called, setCalled] = React.useState(false);
  if(!called){
        api
            .get("/movimentacoes/carteira")
            .then((response) => response.data)
            .then((results) => {
                setValor((results.content.acresimo - results.content.decrescimo).toFixed(2));
                called = true;
            })
            .catch((err) => {
            console.log(err);
        });
    }
  return (
    <React.Fragment>
      <Title>Carteira</Title>
      <Typography component="p" variant="h4">
        R${valor}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        em {today.toLocaleString("pt-BR")}
      </Typography>
      <div>
        <Link color="primary" href="/movimentacoes">
          Ver movimentações
        </Link>
      </div>
    </React.Fragment>
  );
}