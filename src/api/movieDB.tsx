import axios from "axios";  

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '363b65a5ea601f4111fdddd19a87691a',
        language: 'en-US'
    }
})

export default movieDB;