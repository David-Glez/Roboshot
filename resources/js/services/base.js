import axios from 'axios';

export default axios.create({
    //baseURL: 'https://roboshot-integra.herokuapp.com/api/web', 
    baseURL: 'http://localhost/api/web',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});