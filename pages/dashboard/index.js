import React, { useState, useEffect } from 'react'
import Icon from '../../components/reusable/icon'
import * as Layouts from '../../components/layouts'
import Button from '../../components/reusable/button'
import styles from '../../styles/dashboard.module.scss'
import { getBookList } from '../../components/auth/admin/api'
import NewBookModal from '../../components/app/dashboard/newBookModal'
import ViewBookModal from '../../components/app/dashboard/viewBookModal'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    newBookModal: false, viewBookModal: false
  });
  const [selectedBookId, setSelectedBookId] = useState("");

  const toggleNewBookModal = () => setIsModalOpen({
    ...isModalOpen, newBookModal: !isModalOpen.newBookModal
  });

  const toggleViewBookModal = () => setIsModalOpen({
    ...isModalOpen, viewBookModal: !isModalOpen.viewBookModal
  });

  const viewBookHandler = bookId => {
    setSelectedBookId(bookId)
    toggleViewBookModal()
  }

  useEffect(() => {
    getBookList().then(data => {
      setBookList(data);
      setIsLoading(false);
    }).catch(() => { })
  }, []);

  return (
    <Layouts.App>
      <div className="divide-y">
        <div className="flex items-center justify-between pl-4 md:pl-0 pr-4 pb-3">
          <h3>Book listing</h3>
          <Button size="sm" onClick={toggleNewBookModal}>
            New book
          </Button>
          {isModalOpen.newBookModal && <NewBookModal toggleModal={toggleNewBookModal} />}
        </div>
        <div className="flex pl-4 md:pl-0 py-5 items-center">
          <Icon name="search" />
          <p className="pl-3 mr-4 w-full">
            <input type="text" className="w-full mr-5 bg-transparent" placeholder="Try your search by title name, author, genre, serial_number, published_year" />
          </p>
        </div>
        <div className="pl-4 md:pl-0 py-5 pr-4">
          <p>List of {bookList.length} {bookList.length === 1 ? "book" : "books"}</p>
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
                  bookList.map(book => {
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
                          <a>delete</a>
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
          />
        )}

      </div>
    </Layouts.App>
  )
}

export default Dashboard;