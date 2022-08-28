import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Icon from '../../components/reusable/icon'
import Button from '../../components/reusable/button'
import { getBookList, deleteBook } from '../../api/book'
import NewBookModal from '../../components/app/dashboard/newBookModal'
import ViewBookModal from '../../components/app/dashboard/viewBookModal'
import BookListingList from '../../components/app/dashboard/bookListing/list'
import BookListingTable from '../../components/app/dashboard/bookListing/table'
import DeleteBookConfirmationModal from '../../components/app/dashboard/deleteBookConfirmationModal'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    newBookModal: false, viewBookModal: false, deleteBookModal: false
  });
  const [selectedBookId, setSelectedBookId] = useState("");
  const [bookToDelete, setBookToDelete] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [bookListToDisplay, setBookListToDisplay] = useState([]);

  const toggleNewBookModal = () => setIsModalOpen({
    ...isModalOpen, newBookModal: !isModalOpen.newBookModal
  });

  const toggleViewBookModal = () => setIsModalOpen({
    ...isModalOpen, viewBookModal: !isModalOpen.viewBookModal
  });

  const toggleDeleteBookModal = book => {
    if (book) setBookToDelete(book);
    setIsModalOpen({
      ...isModalOpen, deleteBookModal: !isModalOpen.deleteBookModal
    });
  }

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

  const deleteBookHandler = () => {
    const { id: bookId, title } = bookToDelete

    deleteBook(bookId).then(() => {
      const newBookList = [...bookList]
      const bookIndex = newBookList.findIndex(({ id }) => id === bookId)

      toast.success(`${title} successfully deleted`)

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
        <div className={`pl-3 mr-4 w-full flex justify-between sm:justify-start items-center`}>
          {
            isSearching ?
              <>
                <span className="text-gray-500 mr-6">{searchValue}</span>
                <Button
                  variant="link" size="sm"
                  className="text-primary"
                  onClick={cancelSearchHandler}
                >
                  Clear search
              </Button>
              </>
              :
              <input
                type="text"
                name="search"
                value={searchValue}
                disabled={isSearching}
                onKeyDown={handleKeyDown}
                onChange={handleSearchChange}
                className={`${isSearching ? 'sm:w-auto' : 'w-full'} mr-5 bg-transparent`}
                placeholder="Try your search by title name, author, genre, serial_number, published_year"
              />
          }
        </div>
      </div>
      <div className="pl-4 md:pl-0 py-5 pr-4">
        {
          isSearching ?
            <p>We found {bookListToDisplay.length} {bookListToDisplay.length === 1 ? "result" : "results"} based on the search keyword "{searchValue}"</p>
            :
            <p>List of {bookList.length} {bookList.length === 1 ? "book" : "books"}</p>
        }
        {
          isLoading ?
            <div className="flex justify-center bg-white p-4 mt-5 mr-4">
              <div className="animate-spin rounded-full border-t-2 border-black h-5 w-5 py-2" />
            </div>
            :
            <>
              <BookListingList
                viewBookHandler={viewBookHandler}
                bookListToDisplay={bookListToDisplay}
                toggleDeleteBookModal={toggleDeleteBookModal}
              />

              <BookListingTable
                viewBookHandler={viewBookHandler}
                bookListToDisplay={bookListToDisplay}
                toggleDeleteBookModal={toggleDeleteBookModal}
              />
            </>
        }
      </div>

      {isModalOpen.viewBookModal && (
        <ViewBookModal
          bookId={selectedBookId}
          toggleModal={toggleViewBookModal}
          editBookHandler={editBookHandler}
        />
      )}

      {isModalOpen.deleteBookModal && (
        <DeleteBookConfirmationModal
          book={bookToDelete}
          toggleModal={toggleDeleteBookModal}
          deleteBookHandler={deleteBookHandler}
        />
      )}

    </div>
  )
}

export default Dashboard;