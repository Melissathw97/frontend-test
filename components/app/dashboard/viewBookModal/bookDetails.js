import Button from "../../../reusable/button"

const BookDetails = ({ book, toggleModal, toggleEditing }) => {

  const { serialNo, genre, author, publishedYear, fiction, coverPhoto } = book;

  return (
    <>
      <div className="bg-secondary-200 px-4 py-3 sm:px-6">
        <p className="text-sm text-gray-500">Serial number</p>
        <p>{serialNo}</p>
      </div>

      <div className="px-4 py-4 sm:px-6 sm:py-5 sm:flex sm:flex-wrap">
        <div className="w-1/2 mb-4 sm:mb-6">
          <p className="text-sm text-gray-500">Genre</p>
          <p>{genre.name}</p>
        </div>
        <div className="w-1/2 mb-4 sm:mb-6">
          <p className="text-sm text-gray-500">Author</p>
          <p>{author.name}</p>
        </div>
        <div className="w-1/2 mb-4 sm:mb-6">
          <p className="text-sm text-gray-500">Published year</p>
          <p>{publishedYear}</p>
        </div>
        <div className="w-1/2 mb-4 sm:mb-6">
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
        <Button size="md" variant="secondary" onClick={toggleEditing}>
          Edit
        </Button>
        <Button variant="link" className="bg-transparent" onClick={toggleModal}>
          Done
        </Button>
      </div>
    </>
  )
}

export default BookDetails;