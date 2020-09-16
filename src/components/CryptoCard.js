import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles'
import { Box } from '@material-ui/core';

const useStyles = makeStyles( () => ({
    rowBox: {
        display: 'flex',
        height: '90px',
    },
    cellPrimary: {
        flex: '1 1 35%',
        border: '1px solid gray',
    },
    cellSecondary: {
        flex: '1 1 20%',
        border: '1px solid gray',
    },
    flexBasis: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
}))

const CryptoCard = () => {
    const classes = useStyles();
    return (
    <Container maxWidth="lg" className={classes.rowBox}>
        <div className={`${classes.cellPrimary} ${classes.flexBasis}`}>
            <Avatar style={{marginRight: '1rem' }} src="/static/images/avatar/1.jpg" />
            
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='subtitle2'>Bitcoin</Typography>
                  <Typography variant='overline'>BTN</Typography>
            </Box>
            
        </div>
        <div className={classes.cellPrimary}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='subtitle1'>10,1000 $</Typography>
                  <Typography variant='h6'>1day</Typography>
            </Box>
        </div>
        <div className={classes.cellSecondary}>hello</div>
    </Container>
    )
}

export default CryptoCard
