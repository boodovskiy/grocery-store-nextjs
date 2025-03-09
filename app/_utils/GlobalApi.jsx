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

const getAllProducts = async () => {
    const resp = await axiosClient.get('/products?populate=*');
    return resp.data.data;
}

const getProductsByCategory = async (category) => {
    const resp = await axiosClient.get('/products?filters[categories][name][$in]=' + category + "&populate=*");
    return resp.data.data;
}

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
})

const signIn = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})

const addToCart = (data, jwt) => axiosClient.post('/user-carts?populate=products', data, {
    headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }
});

const getCartItems = (userId, jwt) => axiosClient.get('/user-carts?filters[userId][$eq]=' + userId + '&[populate][products][populate][images][populate]=*', {
    headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }
}).then( resp => {
    const data = resp.data.data;
    const cartItemList = data.map((item, index) => ({
        name: item.products[0]?.name,
        quantity: item.quantity,
        amount: item.amount,
        image: item.products[0]?.images[0]?.url,
        actualPrice: item.products[0]?.mrp,
        id: item.id
    }))

    return resp.data.data;
})

export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    registerUser,
    signIn,
    addToCart,
    getCartItems
}