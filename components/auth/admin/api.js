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
    books: '/books',
    authors: '/authors',
    genres: '/genres',
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

export const deleteBook = id => {
    return api.delete(`${apiRoutes.books}/${id}`)
}

export const getAuthorList = () => {
    return api.get(apiRoutes.authors)
        .then(res => {
            return res.data.authors;
        })
}

export const getGenreList = () => {
    return api.get(apiRoutes.genres)
        .then(res => {
            return res.data.genres;
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

export const createGenre = ({ name }) => {
    return api.post(apiRoutes.genres, {
        genre: {
            name
        }
    }).then(res => {
        return res.data.genre;
    })
}