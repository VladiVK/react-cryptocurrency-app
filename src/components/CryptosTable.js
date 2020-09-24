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
// Hidden component Material UI
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

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
  resizedCell: {
    paddingLeft: '10px',
    paddingRight: 0,
  },
}));

const priceChanges = (dataObj, key) => {
  let percentageValue = 'NA';

  if (dataObj) {
    percentageValue = new Intl.NumberFormat('en-US', {
      style: 'percent',
    }).format(dataObj[key]);
    return percentageValue === '-0%' ? '0%' : percentageValue;
  }
  return percentageValue;
};
const priceChangesColor = (dataObj, key) => {
  if (!dataObj) return 'red';

  if (dataObj) {
    const value = parseFloat(priceChanges(dataObj, key));

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
const getCellName = (obj, sortKey, isReverseKey, keyName, name, specials = null) => {
  
  return (
    obj[sortKey] !== keyName ? name : obj[isReverseKey] ?
        <span>{name} &uarr; {specials? specials[0] : null}</span>
        : <span>{name} &darr; {specials? specials[1] : null}</span> 
     ) 
}


const SORTS = {
  NONE: (list) => list,
  NAME: (list) => sortBy(list, 'name'), 
  PRICE: (list) => list.sort((a, b) => a.price - b.price),
  MARKET_CAP: (list) => list.sort((a, b) => a.market_cap - b.market_cap),
};

// Component
const CryptosTable = () => {

  console.log('CryptosTable... RENDER')
  
  const classes = useStyles();

  const [state, dispatch] = useContext(CryptosContext);

  const localList = [...state.cryptos];

  const sort = state.filters.find( el => el.value === true);
  //{sortKey: 'NONE', value: true, isReverse: false},

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

  const sortedCryptos = sort.isReverse
    ? sortFunction( initialList ).reverse()
    : sortFunction( initialList );


  return (
    <TableContainer component={Paper} >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>

            <Hidden only={['xs', 'sm']}>
              <TableCell>Rank</TableCell>
            </Hidden>

            <TableCell 
              className={classes.resizedCell}
              align='left'
              onClick={ () => handleSort('NAME')}
             >
              { getCellName(sort, 'sortKey', 'isReverse', 'NAME', 'Name', ['z-a', 'a-z']) }
            </TableCell>
            
            <TableCell align='left' style={{paddingLeft: 0}}>
              Chart (24h)
            </TableCell>

            <Hidden only={['xs', 'sm']}>
              <TableCell 
                className={classes.resizedCell}
                align='left'
                onClick={() => handleSort('MARKET_CAP')}
              >
              { getCellName(sort, 'sortKey', 'isReverse', 'MARKET_CAP', 'Market Cap') }
               
              </TableCell>
            </Hidden>
            <TableCell
              align='left'
              className={classes.resizedCell}
              onClick={() => handleSort('PRICE')}
            >
              { getCellName(sort, 'sortKey', 'isReverse', 'PRICE', 'Price') }
           
            </TableCell>

            <Hidden only='xs'>
              <TableCell className={classes.resizedCell} align='left'>Changes</TableCell>
            </Hidden>

          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCryptos.map((crypto) => (
            <TableRow key={crypto.id}>

            <Hidden only={['xs', 'sm']}>
              <TableCell align='left' style={{ maxWidth: '0.8rem' }} >
                {crypto.rank}
              </TableCell>
            </Hidden>

              <TableCell align='left' className={`${classes.resizedCell}`}>
               
                <Box style={{ display: 'flex', flexDirection: 'column' }}>

                  <Box style={{ display: 'flex'}}>
                    <Avatar
                      style={{ display: 'inline-block', marginRight: '0.5rem' }}
                      src={crypto.logo_url}
                      className={classes.middle}
                    />
                    <Typography variant='overline'>{crypto.currency}</Typography>
                  </Box>

                  <Typography variant='subtitle2'>{crypto.name}</Typography>
                  
                </Box>
              </TableCell>

              <TableCell align='left' style={{paddingLeft: 0, marginLeft: 0}} >
               <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {!crypto['1d'] ? (
                  <Typography  style={{color: 'red', alignSelf: 'center'}}>NA</Typography>
                ) : (
                    <>
                      <PriceChart
                        price={crypto.price}
                        priceChanges={crypto['1d'].price_change}
                        priceChangesPct={crypto['1d'].price_change_pct}
                      />
                      <Typography variant='body2' style={{color: 'gray', alignSelf: 'center'}}>
                        24h
                      </Typography> 
                    </>
                )}
                </Box>
              </TableCell>

              <Hidden only={['xs', 'sm']}>
                <TableCell align='left'>
                  <Typography variant='subtitle1'>
                    {getMarketData(crypto, 'market_cap')}
                  </Typography>
                </TableCell>
              </Hidden>

              <TableCell align='left' className={classes.resizedCell}>
                <Typography variant='subtitle1'>
                  {getMarketData(crypto, 'price')}
                </Typography>

                <Hidden only={['sm', 'md', 'lg', 'xl']}>

                  <Typography
                    variant='body2'
                    style={{
                      color: priceChangesColor(crypto['1d'], 'price_change_pct'),
                      paddingLeft: '1rem'
                    }}
                  >
                    {`${priceChanges(crypto['1d'], 'price_change_pct')} `}
                    <span style={{color: 'gray'}}>1d</span>
                  </Typography>

                  <Typography
                    variant='body2'
                    style={{
                      color: priceChangesColor(crypto['30d'], 'price_change_pct'),
                      paddingLeft: '1rem'
                    }}
                  >
                    {`${priceChanges(crypto['30d'], 'price_change_pct')} `}
                    <span style={{color: 'gray'}}>30d</span>
                  </Typography>

                </Hidden>

              </TableCell>

              <Hidden only='xs'>
                <TableCell align='left' >
                  <Typography
                    variant='subtitle1'
                    style={{color: priceChangesColor(crypto['1d'], 'price_change_pct')}}
                  >
                    {`${priceChanges(crypto['1d'], 'price_change_pct')} `}
                    <span style={{color: 'gray'}}>(1 day)</span>
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    style={{color: priceChangesColor(crypto['30d'], 'price_change_pct')}}
                  >
                  {`${priceChanges(crypto['30d'], 'price_change_pct')} `}
                    <span style={{color: 'gray'}}>(30 days)</span>
                  </Typography>
                </TableCell>
              </Hidden>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CryptosTable.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default  withWidth()(CryptosTable);
