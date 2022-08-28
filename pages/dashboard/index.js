import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Icon from '../../components/reusable/icon'
import * as Layouts from '../../components/layouts'
import Button from '../../components/reusable/button'
import styles from '../../styles/dashboard.module.scss'
import NewBookModal from '../../components/app/dashboard/newBookModal'
import ViewBookModal from '../../components/app/dashboard/viewBookModal'
import { getBookList, deleteBook } from '../../components/auth/admin/api'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    newBookModal: false, viewBookModal: false
  });
  const [selectedBookId, setSelectedBookId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [bookListToDisplay, setBookListToDisplay] = useState([]);

  const toggleNewBookModal = () => setIsModalOpen({
    ...isModalOpen, newBookModal: !isModalOpen.newBookModal
  });

  const toggleViewBookModal = () => setIsModalOpen({
    ...isModalOpen, viewBookModal: !isModalOpen.viewBookModal
  });

  const addBookHandler = newBook => {
    const newBookList = [...bookList]
    newBookList.push(newBook)
    setBookList(newBookList)
  }

  const editBookHandler = newBook => {
    const newBookList = [...bookList]
    const bookIndex = newBookList.findIndex(({ id }) => id === newBook.id)

    if (bookIndex > -1) {
      newBookList[bookIndex] = newBook
      setBookList(newBookList)
    }
  }

  const viewBookHandler = bookId => {
    setSelectedBookId(bookId)
    toggleViewBookModal()
  };

  const deleteBookHandler = ({ title, bookId }) => {
    deleteBook(bookId).then(() => {
      toast.success(`${title} successfully deleted`)

      const newBookList = [...bookList]
      const bookIndex = newBookList.findIndex(({ id }) => id === bookId)

      if (bookIndex > -1) {
        newBookList.splice(bookIndex, 1)
        setBookList(newBookList)
      }

    }).catch(() => {
      toast.error(`${title} failed to delete. Please try again later.`)
    })
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      searchBookHandler()
    }
  }

  const handleSearchChange = e => {
    setSearchValue(e.target.value)
  }

  const searchBookHandler = () => {
    setIsSearching(true)
    const matchedBooks = bookList.filter(({
      serial_number: serialNo,
      title,
      author: {
        name: author
      },
      genre: {
        name: genre
      },
      published_year: publishedYear,
      fiction
    }) => {
      const book = { serialNo, title, author, genre, publishedYear, fiction }
      const keys = Object.keys(book)

      const hasMatch = keys.some(key => {
        const search = searchValue.toUpperCase()
        const value = book[key].toString().toUpperCase()
        return value.includes(search)
      })

      return hasMatch
    })

    setBookListToDisplay(matchedBooks)
  }

  const cancelSearchHandler = () => {
    setSearchValue("")
    setIsSearching(false)
    setBookListToDisplay(bookList)
  }

  useEffect(() => {
    getBookList().then(data => {
      setBookList(data);
      setBookListToDisplay(data);
      setIsLoading(false);
    }).catch(() => { })
  }, []);

  useEffect(() => {
    if (isSearching) {
      setSearchValue("")
      setIsSearching(false)
    }

    setBookListToDisplay(bookList);
  }, [bookList]);

  return (
    <Layouts.App>
      <div className="divide-y">
        <div className="flex items-center justify-between pl-4 md:pl-0 pr-4 pb-3">
          <h3>Book listing</h3>
          <Button size="sm" onClick={toggleNewBookModal}>
            New book
          </Button>
          {isModalOpen.newBookModal && (
            <NewBookModal
              toggleModal={toggleNewBookModal}
              addBookHandler={addBookHandler}
            />
          )}
        </div>
        <div className="flex pl-4 md:pl-0 h-16 items-center">
          <Icon name="search" />
          <div className={`pl-3 mr-4 w-full flex ${styles.searchWrapper}`}>
            <input
              type="text"
              name="search"
              value={searchValue}
              disabled={isSearching}
              onKeyDown={handleKeyDown}
              onChange={handleSearchChange}
              className={`${isSearching ? 'w-auto' : 'w-full'} mr-5 bg-transparent`}
              placeholder="Try your search by title name, author, genre, serial_number, published_year"
            />
            {
              isSearching && (
                <Button
                  variant="link" size="sm"
                  className="text-primary"
                  onClick={cancelSearchHandler}
                >
                  Clear search
                </Button>
              )
            }
          </div>
        </div>
        <div className="pl-4 md:pl-0 py-5 pr-4">
          {
            isSearching ?
              <p>We found {bookListToDisplay.length} {bookListToDisplay.length === 1 ? "result" : "results"} based on the search keywords "{searchValue}"</p>
              :
              <p>List of {bookList.length} {bookList.length === 1 ? "book" : "books"}</p>
          }
          {
            isLoading ?
              <div className="flex justify-center bg-white p-4 mt-5 mr-4">
                <div className="animate-spin rounded-full border-t-2 border-black h-5 w-5 py-2" />
              </div>
              :
              <div className={`table-fixed bg-white w-full text-left mt-5 ${styles.bookListTable}`}>
                <div>Serial number</div>
                <div>Book title</div>
                <div>Author</div>
                <div>Genre</div>
                <div>Published year</div>
                <div>Fiction</div>
                <div>Cover Photo</div>
                <div>Action</div>
                {
                  bookListToDisplay.map(book => {
                    const {
                      id,
                      title,
                      fiction,
                      cover_photo: {
                        url: coverPhotoUrl
                      },
                      serial_number: serialNumber,
                      published_year: publishedYear,
                      author: {
                        name: author
                      },
                      genre: {
                        name: genre,
                      }
                    } = book;

                    return (
                      <>
                        <div>{serialNumber}</div>
                        <div>{title}</div>
                        <div>{author}</div>
                        <div>{genre}</div>
                        <div>{publishedYear}</div>
                        <div>{fiction ? "Yes" : "No"}</div>
                        <div className="text-secondary">
                          <a target="_blank" href={coverPhotoUrl} download={title}>
                            download
                          </a>
                        </div>
                        <div>
                          <a onClick={() => viewBookHandler(id)}>
                            view
                          </a>
                          <a onClick={() => deleteBookHandler({ title, bookId: id })}>
                            delete
                          </a>
                        </div>
                      </>
                    )
                  })
                }
              </div>
          }
        </div>

        {isModalOpen.viewBookModal && (
          <ViewBookModal
            bookId={selectedBookId}
            toggleModal={toggleViewBookModal}
            editBookHandler={editBookHandler}
          />
        )}

      </div>
    </Layouts.App>
  )
}

export default Dashboard;