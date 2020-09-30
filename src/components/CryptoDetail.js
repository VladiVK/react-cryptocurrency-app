import React, { useEffect, useState, useContext } from 'react';
import { Link, useRouteMatch, useHistory} from 'react-router-dom';
import axios from 'axios';

import {CryptosContext} from '../contexts/CryptosContext';
import LoaderComp from './LoaderComp';
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Box,
  Button
} from '@material-ui/core';

// const URL = `https://api.nomics.com/v1/currencies/ticker?key=ae04d4b6ed06b87563e71f31fd10bc23`;

const getPrice = (dataObj, key) => {
  let price = 'NA';

  if (dataObj) {
    price = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(dataObj[key]);
  }

  return price;
};
const CryptoDetail = () => {

  const match = useRouteMatch();
  const history = useHistory();
  
// const [crypto, setCrypto] = useState(null);
  const [state, dispatch] = useContext(CryptosContext);
  const crypto = state.cryptos.find( coin => coin.id === match.params.id)

//   useEffect(() => {
//     axios
//       .get(`${URL}&ids=${match.params.id}&interval=1d,30d&convert=USD`)
//       .then((res) => setCrypto(res.data[0]));
//   }, []);

  const details = crypto ? (
    <Card>
      <CardHeader
        avatar={<Avatar src={crypto.logo_url} />}
        title={crypto.currency}
        subheader={crypto.name}
      />
      <CardContent>

        <Box style={{ display: 'flex' }}>
          <Typography style={{ marginRight: '10px' }} variant='h5'>
            Price:
          </Typography>
          <Typography variant='h6'>{getPrice(crypto, 'price')}</Typography>
        </Box>

        <Box style={{ display: 'flex' }}>
          <Typography style={{ marginRight: '10px' }} variant='h5'>
            Market Cap:
          </Typography>
          <Typography variant='h6'>{getPrice(crypto, 'market_cap')}</Typography>
        </Box>

        <Box style={{ display: 'flex' }}>
          <Typography style={{ marginRight: '10px' }} variant='h5'>
            Market Rank:
          </Typography>
          <Typography variant='h6'>#{crypto.rank}</Typography>
        </Box>

        <Box style={{ display: 'flex' }}>
          <Typography style={{ marginRight: '10px' }} variant='h5'>
            Circulating:
          </Typography>
          <Typography variant='h6'>{crypto.circulating_supply}</Typography>
        </Box>

        <Button 
          variant="outlined"
          size="small"
          color="primary"
          style={{marginTop: '1rem'}}
          onClick={ () => history.push('/')}
        >
          go back
        </Button>

        

      </CardContent>
    </Card>
  ) : (
    <LoaderComp />
  );

  return <div>{details}</div>;
};

export default CryptoDetail;
