import React from 'react'

const CryptoDetail = ({match}) => {
    // console.log(match);
    return (
        <div>
            <h2>{match.params.id}</h2>
        </div>
    )
}

export default CryptoDetail
