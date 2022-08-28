import Cookies from 'js-cookie'
import { api } from './apiFetcher'
import { apiRoutes } from './routes'

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