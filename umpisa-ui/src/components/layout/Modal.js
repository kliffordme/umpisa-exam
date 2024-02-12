import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from React Bootstrap
import Form from 'react-bootstrap/Form';
import axios from 'axios'

export const CustomModal = ({showModal, handleCloseModal, modalType, getAllBooks}) => {

    const { id, type } = modalType;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        rating: '',
        image: null
      });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    

    const handleUpdateBook = (e) => {
        e.preventDefault();
    }

    const handleDeleteBook = async() => {
        try {
            const data = await axios.delete(`http://localhost:3000/api/books/${id}/delete`)
            console.log(data)
            getAllBooks()
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
