import React from 'react';
import './App.css';
import {Card} from '@material-ui/core';
import SearchBox from "./components/searchBox";
import Grid from "@material-ui/core/Grid";


function App() {

    return (
        <div className="App">
            <Card>

                <Grid container>
                    <Grid item xs={4}>
                        <SearchBox/>
                    </Grid>

                </Grid>

            </Card>
        </div>
    );
}

export default App;
