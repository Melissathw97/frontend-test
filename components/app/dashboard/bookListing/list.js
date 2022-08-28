import styles from '../../../../styles/dashboard.module.scss'
import { useState } from 'react';

const BookListingList = ({ bookListToDisplay, viewBookHandler, toggleDeleteBookModal }) => {
  const [showActions, setShowActions] = useState({});

  const expandActions = id => {
    const newState = { ...showActions }

    Object.keys(newState).map(key => {
      if (key === id) {
        newState[key] = true
      } else {
        newState[key] = false
      }
    })

    setShowActions({
      ...newState,
      [id]: !showActions[id]
    })
  }

  return (
    <div className={`table-fixed bg-white w-full text-left mt-4 relative ${styles.bookList}`}>
      <div className={`divide-y ${styles.bookListContent}`}>
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
              <div key={id} className="select-none p-3 cursor-pointer">
                <div className="flex items-center" onClick={() => expandActions(id)}>
                  <img src={coverPhotoUrl} className="mr-3 w-24 h-36 rounded-md object-cover" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{serialNumber}</p>
                    <p className="text-md mb-1">{title}</p>
                    <p className="text-sm text-gray-500 mb-3">{author}</p>
                    <p className="text-sm mb-1">{genre} • {fiction ? "Fiction" : "Non-fiction"}</p>
                    <p className="text-sm mb-1">{publishedYear}</p>
                  </div>
                </div>
                <div className={`flex text-sm text-center ${showActions[id] ? 'max-h-20' : 'max-h-0'} ${!showActions[id] && "overflow-hidden"} transition-all ease-in-out duration-500 mt-1`}>
                  <a className="flex-1 py-2" onClick={() => toggleDeleteBookModal(book)}>
                    Delete
                  </a>
                  <a className="flex-1 py-2 rounded-lg" onClick={() => viewBookHandler(id)}>
                    View
                  </a>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default BookListingList;