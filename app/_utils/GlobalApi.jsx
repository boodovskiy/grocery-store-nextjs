const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*')

const getSliders = async () => {
    const resp = await axiosClient.get('/sliders?populate=*');
    return resp.data.data;
}

export default {
    getCategory,
    getSliders
}