import Axios from "axios";

let urls = {
    test: `${process.env.apiURL}api/v1/`,
    development: `${process.env.apiURL}api/v1/`,
    production: `${process.env.apiURL}api/v1/`
}

export const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {}
});

export const routes = {
    sign_in: '/users/sign_in',
    sign_out: '/users/sign_out',
};