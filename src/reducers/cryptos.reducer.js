
/*   cryptos: [...state.cryptos].filter( coin => (
                    coin.name.toLowerCase().includes(action.payload.toLowerCase()))
                )  */

const cryptosReducer = (state,action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                error: false,
                searchTerm: '',
                cryptos: [...action.payload]
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: 'Something went wrong!',
            }
        case 'SEARCH_TERM':
            
            return {
                ...state,
                searchTerm: action.payload,
            }
           
        default:
            return state
    }
}
export default cryptosReducer