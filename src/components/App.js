import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CryptosProvider} from '../contexts/CryptosContext'
import SearchBar from './SearchBar';
import Cryptos from './Cryptos';
import CryptoDetail from './CryptoDetail';



const App = () => {
  
  return (
    <Router>
      <CryptosProvider>
          <SearchBar />
        <Switch>
          <Route path='/' exact component={Cryptos} /> 
          <Route path='/:id' component={CryptoDetail} /> 
        </Switch>
      </CryptosProvider>
    </Router>
  )
}

export default App;


