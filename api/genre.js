import { api } from './apiFetcher'
import { apiRoutes } from './routes'

export const getGenreList = () => {
  return api.get(apiRoutes.genres)
    .then(res => {
      return res.data.genres;
    })
}

export const createGenre = ({ name }) => {
  return api.post(apiRoutes.genres, {
    genre: {
      name
    }
  }).then(res => {
    return res.data.genre;
  })
}