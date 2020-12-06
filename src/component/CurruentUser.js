import React from 'react'
import {Paper,Grid,Typography} from "@material-ui/core";
import useAuthContext from "../context/authContext";
const CurruentUser = () => {
    const {currentUser} = useAuthContext();
    
    return (
        <Grid xs={12} item>
            <Paper>
                <Typography color="primary" align="center" variant="h4">{currentUser}</Typography>
            </Paper>
        </Grid>
    )
}

export default CurruentUser
