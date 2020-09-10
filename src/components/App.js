import React from 'react';
import Cryptos from './Cryptos';

import {CryptosProvider} from '../contexts/CryptosContext'

const App = () => {
  
  return (
    <CryptosProvider>
        <Cryptos />
    </CryptosProvider>
  )
}

export default App;
