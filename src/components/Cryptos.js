
import React,{useContext} from 'react'
import {CryptosContext} from '../contexts/CryptosContext'

// components
import CryptosTable from './CryptosTable'
import SearchBar from './SearchBar'
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


const Cryptos = () => {

  const [state] = useContext(CryptosContext)

  return (
    <>
      {state.loading && <CircularProgress />}
      {state.error && <h1>{state.error}</h1>}
        {!state.loading && !state.error &&
          <>
            <SearchBar />
            <Typography align='center' variant='h4'>
              Top 100 cryptos by Market Cap
            </Typography>   
            <CryptosTable />
          </>
        }
    </>
  );
}

export default Cryptos;