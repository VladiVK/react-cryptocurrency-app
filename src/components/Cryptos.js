import React,{useContext} from 'react';
import {CryptosContext} from '../contexts/CryptosContext'

// components
import CryptosTable from './CryptosTable'
import PriceChart from './PriceChart';
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';



const Cryptos = () => {

  const [state] = useContext(CryptosContext)

  return (
    <>
      {state.loading && <CircularProgress />}
      {state.error && <h1>{state.error}</h1>}
      <CryptosTable />
      <PriceChart />
    </>
  );
}

export default Cryptos;