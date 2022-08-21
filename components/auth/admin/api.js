import Axios from 'axios'
import Cookies from 'js-cookie'

let urls = {
    test: `${process.env.apiURL}api/v1/`,
    development: `${process.env.apiURL}api/v1/`,
    production: `${process.env.apiURL}api/v1/`
}

export const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "X-ACCESS-ID": process.env.accessId
    }
});

export const apiRoutes = {
    login: '/login',
    register: '/register',
    getAccount: '/accounts',
};

export const userLogin = ({ email, password }) => {
    return api.post(apiRoutes.login, {
        user: {
            email, password
        }
    }).then(res => {
        if (res.headers.authorization) {
            const token = res.headers.authorization;
            Cookies.set('authToken', token, { expires: 7 }); // 7 days expiry
            api.defaults.headers.Authorization = token;
        }
    })
}

export const userRegister = ({ email, name, password }) => {
    return api.post(apiRoutes.register, {
        user: {
            email, name, password
        }
    }).then(res => {
        if (res.headers.authorization) {
            const token = res.headers.authorization;
            Cookies.set('authToken', token, { expires: 7 }); // 7 days expiry
            api.defaults.headers.Authorization = token;
        }
    })
}

export const getUserAccount = () => {
    return api.get(apiRoutes.getAccount)
        .then(res => {
            return res.data.user;
        })
}