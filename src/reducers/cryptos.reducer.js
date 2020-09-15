/*   cryptos: [...state.cryptos].filter( coin => (
                    coin.name.toLowerCase().includes(action.payload.toLowerCase()))
                )  */

const cryptosReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: false,
        searchTerm: '',
        cryptos: [...action.payload],
        filters: [
            {sortKey: 'NONE', value: true, isReverse: false},
            {sortKey: 'PRICE', value: false, isReverse: false},
            {sortKey: 'MARKET_CAP', value: false, isReverse: false},
            {sortKey: 'NAME', value: false, isReverse: false},
        ],
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: 'Something went wrong!',
      };
    case 'SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: [...state.filters]
          .map( item => item.sortKey === action.payload.sortKey
            ? action.payload
            : {...item, value: false})     
      };
    default:
      return state;
  }
};
export default cryptosReducer;
