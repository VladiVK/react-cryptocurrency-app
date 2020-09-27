import React, { useContext } from 'react';
import { CryptosContext } from '../contexts/CryptosContext';

// components
import CryptosTable from './CryptosTable';
import LoaderComp from './LoaderComp';

// Material-UI

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Cryptos = (props) => {
  const [state] = useContext(CryptosContext);
  console.log(props)
  return (
    <Grid container direction='column'>
      {state.loading && <LoaderComp />}
      {state.error && <h1>{state.error}</h1>}
      {!state.loading && !state.error && (
        <>

          <Grid item container>
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={10}>
              <Typography
                align='center'
                variant='h5'
                style={{margin: '1.6rem 1rem'}}
              >
                Top 100 Cryptos by Market Cap
              </Typography>
              <CryptosTable />
            </Grid>
            <Grid item xs={false} sm={1} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Cryptos;
