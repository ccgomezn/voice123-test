import axios from 'axios';




export function get(url, headers){
    return axios.get(url,{ headers:headers });
}
