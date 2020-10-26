import axios from 'axios';

export default axios.create({
    //baseURL: 'https://roboshot-integra.herokuapp.com/api', 
    baseURL: 'https://127.0.0.0:8081/api',
    headers: {
        'Content-type': 'application/json'
    }
});