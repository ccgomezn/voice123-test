import React, {useState, useEffect} from 'react';
import './App.css';
import {Card, Container, CircularProgress, makeStyles} from '@material-ui/core';
import SearchBox from "./components/searchBox";
import Grid from "@material-ui/core/Grid";
import {apiCall} from "./helpers/API/apiCalls";
import TableCustom from "./components/table";


const useStyles = makeStyles(theme => ({

    buttonProgress: {
        color: 'green',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function App() {

    const [searchText, setSearchText] = useState('');
    const [finalSearchText, setFinalSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();



    useEffect(() => {
        apiCall('', 1)
            .then((response) => {
                setData(response.data.providers);
                setTotal(response.headers['x-list-total-rows'] !== "undefined" ? response.headers['x-list-total-rows'] : 0);
            });
    }, []);

    const handleChange = (value, type) => {
        switch (type) {
            case 'searchText':
                setSearchText(value);
                break;
            case 'page':
                setPage(value);
                break;
            default:
                break;
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        setLoading(true);
        apiCall(searchText, page + 1).then((response) => {
            setData(response.data.providers);
            setLoading(false);

        })
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        apiCall(searchText, page + 1).then((response) => {
            setData(response.data.providers);
            setLoading(false);
            setTotal(response.headers['x-list-total-rows'] !== "undefined" ? response.headers['x-list-total-rows']  : 0);
            setFinalSearchText(searchText);
        })
    };

    const tableOptions = [
        {
            type: 'nameLink',
            superKey: 'user',
            key: 'name',
            auxKey: 'username'
        },
        {
            type: 'image',
            superKey: 'user',
            key: 'picture_medium'
        },
        {
            type: 'paragraph',
            superKey: '',
            key: ['summary', 'additional_details', 'description']
        },
        {
            type: 'audio',
            superKey: 'relevant_sample',
            key: 'file'
        }



    ];
    return (
        <div className="App">
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

            <Container maxWidth="lg">
                <Grid container spacing={3} alignItems="flex-start" justify="flex-end">

                    <Grid item xs={12} >

                        <Card>

                            <Grid container alignItems="flex-start" justify="flex-end">
                                <SearchBox handleSubmit={(event) => handleSubmit(event)} value={searchText}
                                           onChange={(value) => handleChange(value, 'searchText')}/>

                            </Grid>

                        </Card>
                    </Grid>
                    <Grid item xs={12}>

                        <Card>

                            <Grid container>
                                <Grid item xs={12}>
                                    <TableCustom data={data} page={page} options={tableOptions} total={total}
                                                 onChangePage={(event, page) => handleChangePage(page)}
                                                 searchText={finalSearchText? finalSearchText: ''}/>
                                </Grid>

                            </Grid>

                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
        ;
}

export default App;
