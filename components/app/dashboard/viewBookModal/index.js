import Icon from '../../../reusable/icon'
import { useEffect, useState } from 'react'
import Button from '../../../reusable/button';
import Loading from '../../../reusable/loading';
import { getBook } from '../../../auth/admin/api';

const ViewBookModal = ({ bookId, toggleModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState({
    title: "",
    serialNo: "",
    author: "",
    genre: "",
    publishedYear: "",
    fiction: "",
    coverPhoto: ""
  });

  useEffect(() => {
    getBook(bookId).then(book => {
      const {
        title,
        serial_number: serialNo,
        author: {
          name: author
        },
        genre: {
          name: genre
        },
        published_year: publishedYear,
        fiction,
        cover_photo: {
          url: coverPhoto
        }
      } = book;

      setBookDetails({ title, serialNo, author, genre, publishedYear, fiction, coverPhoto });
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

  const { title, serialNo, genre, author, publishedYear, fiction, coverPhoto } = bookDetails;

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
                  {title}
                </h3>
              </div>

              <div className="bg-secondary-200 px-4 py-3 sm:px-6">
                <p className="text-sm text-gray-500">Serial number</p>
                <p>{serialNo}</p>
              </div>

              <div className="px-4 py-5 sm:px-6 sm:flex sm:flex-wrap">
                <div className="w-1/2 mb-6">
                  <p className="text-sm text-gray-500">Genre</p>
                  <p>{genre}</p>
                </div>
                <div className="w-1/2 mb-6">
                  <p className="text-sm text-gray-500">Author</p>
                  <p>{author}</p>
                </div>
                <div className="w-1/2 mb-6">
                  <p className="text-sm text-gray-500">Published year</p>
                  <p>{publishedYear}</p>
                </div>
                <div className="w-1/2 mb-6">
                  <p className="text-sm text-gray-500">Fiction</p>
                  <p>{fiction ? "Yes" : "No"}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm text-gray-500">Cover photo</p>
                  <div className="my-2">
                    <img
                      src={coverPhoto}
                      className="w-full h-48 rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse items-center justify-between">
                <Button size="md" variant="secondary" type="submit">
                  Edit
                </Button>
                <Button variant="link" className="bg-transparent" onClick={toggleModal}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBookModal;