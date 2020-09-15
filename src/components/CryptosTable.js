import React, { useContext, useState, useEffect } from 'react';
import { CryptosContext } from '../contexts/CryptosContext';
import PriceChart from './PriceChart';
// lodash
import { initial, sortBy } from 'lodash';
// Material-UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// Task: learn Hidden component Material UI

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  middle: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  flexBasis: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bigScreen: {
    ['@media (max-width: 700px)']: { display: 'none' },
  },
}));

const dayChanges = (dataObj, key) => {
  let percentageValue = 'NA';

  if (dataObj) {
    percentageValue = new Intl.NumberFormat('en-US', {
      style: 'percent',
    }).format(dataObj[key]);
    return percentageValue === '-0%' ? '0%' : percentageValue;
  }
  return percentageValue;
};
const dayChangesColor = (dataObj, key) => {
  if (!dataObj) return 'red';

  if (dataObj) {
    const value = parseFloat(dayChanges(dataObj, key));

    switch (true) {
      case value === 0:
        return 'black';
      case value > 0:
        return '#35c935';
      case value < 0:
        return '#f01818';
      default:
        return 'black';
    }
  } else {
    return 'black';
  }
};
const getMarketData = (dataObj, key) => {
  const marketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dataObj[key]);

  return marketCap;
};

const SORTS = {
  NONE: (list) => list,
  NAME: (list) => sortBy(list, 'name'), 
  PRICE: (list) => list.sort((a, b) => a.price - b.price),
  MARKET_CAP: (list) => list.sort((a, b) => a.market_cap - b.market_cap),
};

// Component
const CryptosTable = () => {
  const classes = useStyles();

  const [state, dispatch] = useContext(CryptosContext);

  const localList = [...state.cryptos];

  const sort = state.filters.find( el => el.value === true);
  //{sortKey: 'NONE', value: true, isReverse: false},
  


  


  // const handleSort = (sortKey) => {
  //   const isReverse = sort.sortKey === sortKey && sort.isReverse === false;
  //   setSort({ sortKey, isReverse });
  // };
  const handleSort = (sortKey) => {
    const isReverse = (sort.sortKey === sortKey) && (sort.isReverse === false);
    dispatch({
      type: 'SET_FILTERS',
      payload: {sortKey: sortKey, value: true, isReverse: isReverse}
    })
    
  };

  const sortFunction = SORTS[sort.sortKey];
  

  
   
  const createList = () => {
    if(state.searchTerm.length === 0) return localList
    return localList.filter( coin => (
        coin.name.toLowerCase().includes(state.searchTerm.toLowerCase() )
      )
    )
  }
 // initial list by search condition or as it is
  const initialList = createList();

  // console.log(initialList);

  const sortedCryptos = sort.isReverse
    ? sortFunction( initialList ).reverse()
    : sortFunction( initialList );


  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell
             className={classes.bigScreen}  
              /* component='th' */
              /* scope='row' */
            >
              Rank
            </TableCell>
            <TableCell align='left' onClick={ () => handleSort('NAME')}
             >
              {sort.sortKey !== 'NAME' ? (
                'Name'
              ) : sort.isReverse ? (
                <span>Name &uarr; z-a</span>
              ) : (
                <span>Name &darr; a-z</span>
              )}
            </TableCell>
            <TableCell align='left'>Chart (24h)</TableCell>
            <TableCell
              className={classes.bigScreen}
              align='left'
              onClick={() => handleSort('MARKET_CAP')}
            >
              {sort.sortKey !== 'MARKET_CAP' ? (
                'Market Cap'
              ) : sort.isReverse ? (
                <span>Market Cap &uarr;</span>
              ) : (
                <span>Market Cap &darr;</span>
              )}
            </TableCell>
            <TableCell align='left' onClick={() => handleSort('PRICE')}>
              {sort.sortKey !== 'PRICE' ? (
                'Price'
              ) : sort.isReverse ? (
                <span>Price &uarr;</span>
              ) : (
                <span>Price &darr;</span>
              )}
            </TableCell>
            <TableCell align='left'>Change (24h)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCryptos.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell
                className={classes.bigScreen}
                align='left'
                style={{ maxWidth: '1.2rem' }}
              >
                {crypto.rank}
              </TableCell>
              <TableCell align='left' className={classes.flexBasis}>
                <Avatar
                  style={{ display: 'inline-block', marginRight: '1rem' }}
                  src={crypto.logo_url}
                  className={classes.middle}
                />

                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='subtitle2'>{crypto.name}</Typography>
                  <Typography variant='overline'>{crypto.currency}</Typography>
                </Box>
              </TableCell>
              <TableCell align='left' style={{ color: 'red' }}>
                {!crypto['1d'] ? (
                  'NA'
                ) : (
                  <PriceChart
                    price={crypto.price}
                    priceChanges={crypto['1d'].price_change}
                    priceChangesPct={crypto['1d'].price_change_pct}
                  />
                )}
              </TableCell>
              <TableCell className={classes.bigScreen} align='left'>
                <Typography variant='subtitle1'>
                  {getMarketData(crypto, 'market_cap')}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='subtitle1'>
                  {getMarketData(crypto, 'price')}
                </Typography>
              </TableCell>
              <TableCell
                align='left'
                style={{
                  color: dayChangesColor(crypto['1d'], 'price_change_pct'),
                }}
              >
                <Typography variant='subtitle1'>
                  {dayChanges(crypto['1d'], 'price_change_pct')}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptosTable;
