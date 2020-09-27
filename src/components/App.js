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

// https://stackoverflow.com/questions/50155909/how-to-use-context-api-with-react-router-v4/50158702

  /*
  
  <CryptosProvider>
      <SearchBar />
    <Switch>
        <Route exact path='/' component={Cryptos } />
        <Route  path='/:id' component={Crypto } />
    </Switch>    
  </CryptosProvider>
    
    */


/*     
<ContextA>
    <Switch>
        <Route exact path='/' render={ () => <Redirect to='/route1' /> } />
        <Route path='/route1' component={ Component1 } />
    </Switch>
    <ContextB>
        <Switch>
            <Route path='/route2' component={ Component2 } />
            <Route path='/route3' component={ Component3 } />
        </Switch>        
    </ContextB>        
</ContextA>
 */


