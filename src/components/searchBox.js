import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import {Button, FormControl, makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    button: {
        marginTop: '18px',
    }
}));


function SearchBox(props) {
    const classes = useStyles();

    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-dense"
                        label="Search..."
                        className={clsx(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                        value={props.value}
                        onChange={(event) => props.onChange(event.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit" className={clsx(classes.button)}>
                        Accept
                    </Button>

                </Grid>

            </Grid>

        </form>


    );

}

export default SearchBox;
