import NewBookForm from './form'
import Icon from '../../../reusable/icon'

export default function NewBookModal({ toggleModal, addBookHandler }) {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
            <div className="bg-white divide-y">
              <div className="flex items-center p-4 sm:px-6">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full sm:h-12 sm:w-12 bg-secondary-200">
                  <Icon name="billing" />
                </div>
                <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  New Book
                </h3>
              </div>

              <NewBookForm
                toggleModal={toggleModal}
                addBookHandler={addBookHandler}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}