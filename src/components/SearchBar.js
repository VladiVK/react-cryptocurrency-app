import React, { useState, useContext, useEffect } from 'react';

import {useHistory, withRouter} from 'react-router-dom'

import {CryptosContext} from '../contexts/CryptosContext'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Slide from '@material-ui/core/Slide';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import Container from '@material-ui/core/Container'

import FilterListIcon from '@material-ui/icons/FilterList';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const SearchBar = (props) => {
  const classes = useStyles();

  // router hook
  const history = useHistory();

  const [inputValue, setInputValue] = useState('');

  const [isFilters, setIsFilters] = useState(false);

  const [state, dispatch] = useContext(CryptosContext);

  const handleInput = e => setInputValue( e.target.value);

  const sort = state.filters.find( el => el.value === true);

  const handleSort = (sortKey) => {
    const isReverse = (sort.sortKey === sortKey) && (sort.isReverse === false);
    dispatch({
      type: 'SET_FILTERS',
      payload: {sortKey: sortKey, value: true, isReverse: isReverse}
    })
    
  };

  useEffect( () => {
      dispatch({type: 'SEARCH_TERM', payload: inputValue})
  }, [inputValue, dispatch] )

  console.log('SearchBar RERENDER...');
  console.log(props.history);

  return (
    <div className={classes.root}>
     
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
           
            <IconButton
              
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={ () => history.push('/')}
            > 
              <TimelineRoundedIcon />
              
            </IconButton>

            <Typography className={classes.title} variant='h6' noWrap>
              Cryptos Market Digest
            </Typography>

            <IconButton
              color='inherit'
              onClick={ () => setIsFilters( prev => !prev) }
            >
              <FilterListIcon />
            </IconButton>

            <div className={classes.search}>
              
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                value={inputValue}
                onChange={handleInput}

                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
          {
            isFilters && 
              <Container style={{display: 'flex', alignItems: 'center'}}>
                <Typography variant='subtitle1' display='inline'>Sort By: </Typography>

                <IconButton onClick={() => handleSort('NAME')} style={{color: 'white'}}>
                  <SortByAlphaIcon fontSize='small' />
                </IconButton>

                <IconButton onClick={() => handleSort('PRICE')} style={{color: 'white'}}>
                  <AttachMoneyIcon fontSize='small' />
                </IconButton>

                <IconButton  onClick={() => handleSort('MARKET_CAP')} style={{color: 'white'}}>
                  <AccountBalanceIcon fontSize='small' />
                </IconButton>
              </Container>
          }
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
};
// export default withRouter(SearchBar) ;
export default SearchBar;
