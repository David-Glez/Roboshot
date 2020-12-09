import axios from 'axios';

export default axios.create({
    //  pruebas en heroku
    baseURL: 'https://roboshot-integra.herokuapp.com/api/web',
    //  desarrollo local 
    //baseURL: 'http://localhost:8081/api/web', 
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});