import { api } from './apiFetcher'
import { apiRoutes } from './routes'

export const getBookList = () => {
  return api.get(apiRoutes.books)
    .then(res => {
      return res.data.books;
    })
}

export const getBook = id => {
  return api.get(`${apiRoutes.books}/${id}`)
    .then(res => {
      return res.data.book;
    })
}

export const createBook = ({ title, fiction, genreId, authorId, coverPhoto, serialNumber, publishedYear }) => {
  return api.post(apiRoutes.books, {
    book: {
      title,
      fiction,
      genre_id: genreId,
      author_id: authorId,
      cover_photo: coverPhoto,
      serial_number: serialNumber,
      published_year: publishedYear
    }
  }).then(res => {
    return res.data.book;
  })
}

export const updateBook = ({ id, title, fiction, genreId, authorId, coverPhoto, serialNumber, publishedYear }) => {
  return api.put(`${apiRoutes.books}/${id}`, {
    book: {
      title,
      fiction,
      genre_id: genreId,
      author_id: authorId,
      cover_photo: coverPhoto,
      serial_number: serialNumber,
      published_year: publishedYear
    }
  }).then(res => {
    return res.data.book;
  })
}

export const deleteBook = id => {
  return api.delete(`${apiRoutes.books}/${id}`)
}