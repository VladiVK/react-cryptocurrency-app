
import React,{useContext} from 'react'
import {CryptosContext} from '../contexts/CryptosContext'

// components
import CryptosTable from './CryptosTable'
import SearchBar from './SearchBar'
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'


const Cryptos = () => {

  const [state] = useContext(CryptosContext)

  return (
    <Grid container direction='column'>
      {state.loading && <CircularProgress />}
      {state.error && <h1>{state.error}</h1>}
        {!state.loading && !state.error &&
          <>
    
            <SearchBar />

            <Grid item container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                <Typography align='center' variant='h4'>
                  Top 100 cryptos by Market Cap
                </Typography>

                <CryptosTable />
                
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
          </>
        }
    </Grid>
  );
}

export default Cryptos;