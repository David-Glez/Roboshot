import axios from 'axios';

export default axios.create({
    //baseURL: 'https://roboshot-integra.herokuapp.com/api', 
    baseURL: 'http://localhost:8081/api/web',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});