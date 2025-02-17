import { STRAPI_BASE_URL } from "@/config";

const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: `${STRAPI_BASE_URL}/api`,
})

const getCategory = () => axiosClient.get('/categories?populate=*')

const getCategoryList = async () => {
    const resp = await axiosClient.get('/categories?populate=*');
    return resp.data.data;
}

const getSliders = async () => {
    const resp = await axiosClient.get('/sliders?populate=*');
    return resp.data.data;
}

export default {
    getCategory,
    getSliders,
    getCategoryList
}