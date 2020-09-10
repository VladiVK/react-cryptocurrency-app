import React, {useReducer, createContext, useEffect} from 'react'
import cryptoReducer from '../reducers/cryptos.reducer'
import axios from 'axios';

const API_KEY = 'ae04d4b6ed06b87563e71f31fd10bc23'
const BASE_URL = 'https://api.nomics.com/v1/currencies/ticker?'
const URL = `${BASE_URL}key=${API_KEY}&interval=1d,30d&convert=USD`

const defaultValue = {
    loading: true,
    error: '',
    cryptos: [],
};   


export const CryptosContext = createContext();

export const CryptosProvider = (props) => {
   
    const [cryptos, dispatch] = useReducer(cryptoReducer, defaultValue)

    useEffect( () => {
        axios
            .get(URL)
            .then( response => {
                const cryptoData = response.data.slice(0,35)
                dispatch({type: 'FETCH_SUCCESS', payload: cryptoData})
            })
            .catch( e => dispatch({type: 'FECTH_ERROR'}) )  
    }, [])

    return (
        <CryptosContext.Provider value={[cryptos, dispatch]}>
            {props.children}
        </CryptosContext.Provider>
    )
}

