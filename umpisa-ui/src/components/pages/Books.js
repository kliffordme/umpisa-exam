import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css'
import Form from 'react-bootstrap/Form';
import { ReactComponent as UpdateLogo } from '../../assets/icons/update.svg';
import { ReactComponent as DeleteLogo } from '../../assets/icons/delete.svg';
import { Pagination } from '../layout/Pagination';
import { CustomModal } from '../layout/Modal';


export const Books = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: '',
    image: null
  });
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false); // State variable to manage modal visibility
  const [modalType, setModalType] = useState(0); 

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(()=>{
    getAllBooks()
  },[])

  const getAllBooks = async() =>{
    try {
      const {data} = await axios.get('http://localhost:3000/api/books/all')
      setData(data.books)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('rating', formData.rating);
    formDataToSend.append('image', formData.image);

    try {
      await axios.post('http://localhost:3000/api/books/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Reset form fields after successful upload
      setFormData({ title: '', author: '', rating: '', image: null });
      getAllBooks()
      alert('Book uploaded successfully!');
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Error uploading book. Please try again.');
    }
  };

    // Function to handle opening the modal
    const handleOpenModal = (bookId) => {
      setModalType(bookId); // Set the ID of the book to be deleted
      setShowModal(true); // Open the modal
    };

      // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };


  return (
    <div className="container m-5 d-flex justify-content-between">
      <div className='upload-container shadow bg-white rounded p-5'>
        <h2 className="mb-4 title fw-bold">Upload Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='fw-bold text-info'>Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='fw-bold text-info'>Author:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='fw-bold text-info'>Rating:</label>
            <input
              type="number"
              className="form-control"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label className='fw-bold text-info'>Image:</label><br/>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control 
              type="file" 
              size="sm"
              className="form-control-file my-3"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
              />
            </Form.Group>
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>
      <div className='shadow bg-white rounded p-5 book-container'>
        <div>
          <h5 className='title fw-bold'>
            All books
          </h5>
        </div>
        {data.length > 0 ? currentPost.map((book)=>(
          <div className='shadow bg-white rounded p-2 d-flex justify-content-between m-1'>
            <img src={`http://localhost:3000/${book.image}`} className="image"  alt={book.title} />
            <span className='fw-bold text-info mt-auto'>{book.title}</span>
            <span className='fw-bold text-info mt-auto'>{book.rating}/5</span>
            <div className='mt-auto'>
              <button 
              className="btn btn-icon p-0 px-1" 
              style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
              onClick={() => handleOpenModal({id: book._id, type: 'update'})} // Pass book ID to handleOpenModal
              >
                <UpdateLogo style={{ width: '20px', height: '20px' }} />
              </button>
              <button
                className="btn btn-icon p-0 px-1"
                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                onClick={() => handleOpenModal({id: book._id, type: 'delete'})} // Pass book ID to handleOpenModal
              >
                <DeleteLogo style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        )) : <div className='fw-bold text-info mt-auto'>No books for now, try uploading.</div>}
          <CustomModal showModal={showModal} handleCloseModal={handleCloseModal} modalType={modalType} getAllBooks={getAllBooks}/>
        <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}/>
      </div>
    </div>
  );
};

