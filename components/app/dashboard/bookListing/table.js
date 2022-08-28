import { Fragment } from 'react'
import styles from '../../../../styles/dashboard.module.scss'
import Icon from '../../../reusable/icon';

const BookListingTable = ({ bookListToDisplay, viewBookHandler, toggleDeleteBookModal }) => {
  return (
    <div className={`table-fixed bg-white w-full text-left mt-5 relative ${styles.bookListTable}`}>
      <div className={styles.bookListTableContent}>
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
              <Fragment key={id}>
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
                    <span>view</span>
                  </a>
                  <a onClick={() => toggleDeleteBookModal(book)}>
                    <span>delete</span>
                  </a>
                </div>
              </Fragment>
            )
          })
        }
      </div>

      <div className="pages flex pt-3 justify-end items-center sticky bottom-0 left-0 pr-4 w-full">
        {Array.from({ length: 1 }, (_v, i) => (
          <div
            key={`page-${i + 1}`}
            className="bg-secondary text-white h-8 w-8 grid place-items-center rounded-full ml-1"
          >
            {i + 1}
          </div>
        ))}
        <span className="ml-4">
          <Icon name="arrowRight" />
        </span>
      </div>
    </div>
  )
}

export default BookListingTable;