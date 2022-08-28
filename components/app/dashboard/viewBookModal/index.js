import { useEffect, useState } from 'react'
import EditBookForm from './editForm'
import BookDetails from './bookDetails'
import Icon from '../../../reusable/icon'
import Loading from '../../../reusable/loading'
import { getBook } from '../../../auth/admin/api'

const ViewBookModal = ({ bookId, toggleModal, editBookHandler }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    id: "",
    title: "",
    serialNo: "",
    author: "",
    genre: "",
    publishedYear: "",
    fiction: "",
    coverPhoto: ""
  });

  const toggleEditing = () => setIsEditing(!isEditing);

  useEffect(() => {
    getBook(bookId).then(book => {
      const {
        id,
        title,
        serial_number: serialNo,
        author,
        genre,
        published_year: publishedYear,
        fiction,
        cover_photo: {
          url: coverPhoto
        }
      } = book;

      setBookDetails({ id, title, serialNo, author, genre, publishedYear, fiction, coverPhoto });
      setIsLoading(false);
    })
  }, []);

  if (isLoading) return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
            <Loading />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
            <div className="divide-y">
              <div className="flex items-center p-4 sm:px-6">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full sm:h-12 sm:w-12 bg-secondary-200">
                  <Icon name="billing" />
                </div>
                <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {isEditing ? "Edit book" : bookDetails.title}
                </h3>
              </div>

              {
                isEditing ?
                  <EditBookForm
                    book={bookDetails}
                    toggleModal={toggleModal}
                    editBookHandler={editBookHandler}
                  />
                  :
                  <BookDetails
                    book={bookDetails}
                    toggleModal={toggleModal}
                    toggleEditing={toggleEditing}
                  />
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBookModal;