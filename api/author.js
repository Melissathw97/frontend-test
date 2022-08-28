import { api } from './apiFetcher'
import { apiRoutes } from './routes'

export const getAuthorList = () => {
  return api.get(apiRoutes.authors)
    .then(res => {
      return res.data.authors;
    })
}

export const createAuthor = ({ name }) => {
  return api.post(apiRoutes.authors, {
    author: {
      name
    }
  }).then(res => {
    return res.data.author;
  })
}