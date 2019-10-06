import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Avatar from '@material-ui/core/Avatar';
import AudioPlayer from "react-h5-audio-player";
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
}));

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>

        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


function TableCustom(props) {
    const classes = useStyles();


    const transformImage = (src) => {
        return <Avatar alt="Remy Sharp" src={src} className={classes.bigAvatar}/>
    };


    const transformAudio = (src) => {
        return <AudioPlayer
            src={src}
        />;
    };

    const transformLink = (text, href) => {
        return <Link href={href}
                     color="inherit" className={classes.link}>
            {href}
        </Link>;
    };

    const transformParagraph = (data, keys, searchText) => {
        let initial_string = '';
        keys.forEach(real_key => {
            initial_string += '\n' + data[real_key];
        });
        let array_string = initial_string.split('\n');
        let array_search = searchText.split(' ');
        let count = 0;
        let selected_paragraph = array_string[1] && array_string[1] !== 'undefined' ? array_string[1] : '';
        array_string.forEach(paragragh => {
            let aux_count = 0;
            array_search.forEach(word => {
                if (word !== "" && paragragh.toLowerCase().includes(word.toLowerCase())) aux_count++;
            });
            if(aux_count > count){
                selected_paragraph = paragragh;
                count = aux_count;
            }
        });
        let definitive_paragraph = '';
        selected_paragraph.split(' ').forEach(word => {
            array_search.forEach(word_search => {
                let regex = RegExp('^[^a-zA-Z]*'+word_search.toLowerCase()+'[^a-zA-Z]*$', 'g');
                if ( word_search !== "" && word.toLowerCase().match(regex)){
                    definitive_paragraph += '<b>'+ word + ' </b>';
                }
                else{
                    definitive_paragraph += word + ' ';
                }
            });
        });
        if(definitive_paragraph === "undefined") definitive_paragraph = '';
        return <span
            dangerouslySetInnerHTML={{__html: definitive_paragraph}}/>;
    };

    const transformData = (type, data, key, auxKey, searchText) => {
        let real_data = key && typeof key === 'string' ? data[key] : data;
        let data_transformed;
        switch (type) {
            case 'image':
                data_transformed = transformImage(real_data);
                break;
            case 'audio':
                data_transformed = transformAudio("https://voice123.com/mp3/" + real_data);
                break;
            case 'nameLink':
                data_transformed = transformLink('https://voice123.com/' + data[auxKey], real_data);
                break;
            case 'paragraph':
                data_transformed = transformParagraph(data, key, searchText);
                break;
            default:
                data_transformed = real_data;
        }
        return data_transformed;
    };

    return (
        <Table className={classes.table}>
            <colgroup>
                <col style={{width: '20%'}}/>
                <col style={{width: '10%'}}/>
                <col style={{width: '40%'}}/>
                <col style={{width: '30%'}}/>
            </colgroup>
            <TableBody>
                {props.data.map(row => (
                    <TableRow key={row.id}>

                        {props.options.map(option => (
                            <TableCell component="th" scope="row">
                                {transformData(option.type, row[option.superKey] ? row[option.superKey] : row, option.key, option.auxKey, props.searchText)}
                            </TableCell>))}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        colSpan={12}
                        count={props.total}
                        rowsPerPage={10}
                        page={props.page}
                        onChangePage={props.onChangePage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )

}

export default TableCustom;
