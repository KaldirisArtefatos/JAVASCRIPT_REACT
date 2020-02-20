import axios from 'axios';

const api = axios.create({
    baseURL: 'https://peaceful-mesa-33985.herokuapp.com/api/v1'
});

export default api;