import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


const LoaderComp = () => {
    return (
        <Box 
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Box>
    )
}

export default LoaderComp
