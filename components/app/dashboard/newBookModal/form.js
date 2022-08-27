import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Icon from '../../../reusable/icon'
import Input from '../../../reusable/input'
import Loading from '../../../reusable/loading'
import Button from '../../../reusable/button'
import styles from '../../../../styles/dashboard.module.scss'
import { getAuthorList, getGenreList, createBook } from '../../../auth/admin/api'

const NewBookForm = ({ toggleModal, addBookHandler }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    title: "",
    serialNo: "",
    author: "",
    genre: "",
    publishedYear: "",
    fiction: "",
    coverPhoto: { label: "", value: "" }
  })

  useEffect(() => {
    getAuthorList().then(authors => {
      const authorOptions = authors.map(({ id, name }) => ({
        label: name, value: id
      }));

      setAuthorList(authorOptions);

      getGenreList().then(genres => {
        const genreOptions = genres.map(({ id, name }) => ({
          label: name, value: id
        }))

        setGenreList(genreOptions);
        setIsLoading(false);
      })
    })
  }, []);

  const fileToBase64Handler = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleChange = (e) => {
    if (e.target.name) {
      setBookDetails({
        ...bookDetails,
        [e.target.name]: e.target.value
      })
    } else {
      setBookDetails({
        ...bookDetails,
        [e.currentTarget.name]: ""
      })
    }
  }

  const handleUpload = (e) => {
    if (e.target.name) {
      const file = document.querySelector('#coverPhoto').files[0];

      fileToBase64Handler(file).then(res => {
        setBookDetails({
          ...bookDetails,
          coverPhoto: { label: file.name, value: res }
        })
      }).catch(() => {
        toast.error("Image failed to upload. Please try again later.")
      })
    } else {
      setBookDetails({
        ...bookDetails,
        [e.currentTarget.name]: { label: "", value: "" }
      })
    }
  }

  const removeCoverPhotoHandler = () => {
    setBookDetails({
      ...bookDetails,
      coverPhoto: { label: "", value: "" }
    })
  }

  const imageUploadLabel = (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:h-14 sm:w-14 bg-secondary border-solid border-secondary-400 border-4">
        <Icon name="photo" />
      </div>
      <p className="ml-4 text-sm uppercase font-medium text-secondary">
        Upload cover photo
      </p>
    </div>
  )

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, fiction, genre, author, coverPhoto, serialNo, publishedYear } = bookDetails;

    createBook({
      title,
      fiction: fiction === 'true',
      genreId: genre,
      authorId: author,
      coverPhoto: coverPhoto.value,
      serialNumber: serialNo,
      publishedYear
    }).then(book => {
      addBookHandler(book)
      toast.success(`${book.title} succesfully added`)
      setIsSubmitting(false)
      toggleModal()
    }).catch(error => {

      const {
        response: {
          data: {
            error_messages: errorMessages
          } = {} = {}
        } = {}
      } = error;

      if (errorMessages) {
        toast.error(errorMessages[0])
      } else {
        toast.error(error)
      }

      setIsSubmitting(false)
    })
  }

  if (isLoading) return <Loading />

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="p-4 pb-0 sm:p-6 sm:pb-0">
        <Input
          label="Book title" name="title"
          onChange={handleChange}
          value={bookDetails.title}
          disabled={isSubmitting}
          required
        />
        <Input
          label="Serial number" name="serialNo"
          onChange={handleChange}
          value={bookDetails.serialNo}
          disabled={isSubmitting}
          required
        />
        <Input
          label="Author" name="author"
          type="select"
          onChange={handleChange}
          value={bookDetails.author}
          selectOptions={authorList}
          disabled={isSubmitting}
          required
        />
        <Input
          label="Genre" name="genre"
          type="select"
          onChange={handleChange}
          value={bookDetails.genre}
          selectOptions={genreList}
          disabled={isSubmitting}
          required
        />
        <div className="sm:flex">
          <div className="flex-1 sm:mr-3">
            <Input
              label="Published year" name="publishedYear"
              type="number"
              onChange={handleChange}
              value={bookDetails.publishedYear}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex-1">
            <Input
              label="Fiction" name="fiction"
              type="select"
              selectOptions={[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
              onChange={handleChange}
              value={bookDetails.fiction}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>
        {
          bookDetails.coverPhoto.value ?
            <div className="flex items-center justify-between mb-5">
              <div className={`flex items-center ${styles.coverPhoto}`}>
                <img src={bookDetails.coverPhoto.value} className="rounded-full h-12 w-12 sm:h-14 sm:w-14 object-cover" />
                <p className="ml-4 text-sm uppercase font-medium text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
                  {bookDetails.coverPhoto.label}
                </p>
              </div>
              <Button variant="link" onClick={removeCoverPhotoHandler} disabled={isSubmitting}>
                <span className="text-primary">
                  Remove image
                </span>
              </Button>
            </div>
            :
            <Input
              label={imageUploadLabel} name="coverPhoto"
              type="image"
              onChange={handleUpload}
              value={bookDetails.coverPhoto}
              disabled={isSubmitting}
              required
            />
        }
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse items-center justify-between">
        <Button size="md" variant="secondary" type="submit" loading={isSubmitting}>
          Add new book
        </Button>
        <Button variant="link" className="bg-transparent px-5" onClick={toggleModal} disabled={isSubmitting}>
          Discard
        </Button>
      </div>
    </form>
  )
};

export default NewBookForm;