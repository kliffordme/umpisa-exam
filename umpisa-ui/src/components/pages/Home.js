import React, { useEffect, useState } from 'react';
import './Home.css'
import { ReactComponent as Books } from '../../assets/icons/book.svg';
import { ReactComponent as Users } from '../../assets/icons/users.svg';
import { ReactComponent as Authors } from '../../assets/icons/author.svg';
import { ReactComponent as Downloads } from '../../assets/icons/download.svg';

const featuredBooks = [
  {
    title: 'Lord Of The Rings',
    rating: '5/5',
    author: 'James Reid'
  },
]


export const Home = () => {

  const [books, setBooks] = useState([])


  useEffect(()=>{
    setBooks(featuredBooks)
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Total Books: 
                </span>
                <br/>
                162
              </div>
              <Books style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Total Users: 
                </span>
                <br/>
                23
              </div>
              <Users style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Authors: 
                </span>
                <br/>
                36
              </div>
              <Authors style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Downloads: 
                </span>
                <br/>
                377
              </div>
              <Downloads style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='large-card shadow bg-white rounded'>
        <span className='title fw-bold text-info'>
          Featured Books
        </span>
        <div className='m-3'>
          <div className='featured-container shadow bg-white rounded'>
            <div className='p-3'>
              {books.map((book)=>(
                <div>
                  <div className='featured-card'>Title: {book.title}</div>
                  <div className='featured-card'>Author: {book.author}</div>
                  <div className='featured-card'>Rating: {book.rating}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
