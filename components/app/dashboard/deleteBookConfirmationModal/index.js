import Button from '../../../reusable/button'

const DeleteBookConfirmationModal = ({ book, toggleModal, deleteBookHandler }) => {

  const { title, author: { name: author } } = book;

  const onConfirmHandler = () => {
    deleteBookHandler()
    toggleModal()
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
            <div className="bg-white divide-y">
              <div className="flex p-6 px-4 sm:px-6">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full sm:h-12 sm:w-12 bg-red-100">
                  <i className="fas fa-exclamation-triangle text-lg text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="my-2 text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Are you sure you want to delete this book?
                  </h3>
                  <p className="text-gray-500">
                    {title} by {author}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse items-center justify-between">
                <Button size="md" variant="warning" onClick={onConfirmHandler}>
                  Delete book
                </Button>
                <Button variant="link" className="bg-transparent px-5" onClick={toggleModal}>
                  Cancel
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteBookConfirmationModal;