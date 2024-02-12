import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from React Bootstrap
import Form from 'react-bootstrap/Form';
import axios from 'axios'

export const CustomModal = ({showModal, handleCloseModal, modalType, data}) => {

    const { id, type } = modalType;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        rating: '',
        image: null
      });
    
    useEffect(() => {
        // Find the object with the matching id from the data array
        const selectedBook = data.find(book => book._id === id);
        // If the object is found, set its values as default for form inputs
        if (selectedBook) {
            setFormData({
                title: selectedBook.title,
                author: selectedBook.author,
                rating: selectedBook.rating,
                image: null // Reset image to null as it should not be displayed as default
            });
      }
    }, [showModal]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    

    const handleUpdateBook = async(e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('rating', formData.rating);
        formDataToSend.append('image', formData.image);
    
        try {
          await axios.put(`${process.env.REACT_APP_API_ROUTE}api/books/${id}/update`, formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          // Reset form fields after successful upload
          setFormData({ title: '', author: '', rating: '', image: null });
          handleCloseModal()
        } catch (error) {
          console.error('Error updating book:', error);
          alert('Error updating book. Please try again.');
        }
    }

    const handleDeleteBook = async() => {
        try {
            const data = await axios.put(`http://localhost:3000/api/books/${id}/delete`)
            console.log(data)
            handleCloseModal()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'delete' ? 'Confirm Deletion' : 'Update Book'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {type === 'delete' ? (
          <p>Are you sure you want to delete this book?</p>
        ) : (
          <form onSubmit={handleUpdateBook}>
            <div className="form-group">
              <label className='fw-bold text-info'>Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
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
                />
                </Form.Group>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button variant="primary" type='submit'>
                    Confirm
                </Button>      
            </Modal.Footer>
          </form>
        )}
      </Modal.Body>
      {type === 'delete' ? 
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDeleteBook}>
          Confirm
        </Button>
        
      </Modal.Footer>
       : null}
    </Modal>
  )
}
