import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from "../assets/eg.jpeg"
import { serverurl } from '../services/serverUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

function BookCard({book}) {
  const dispatch = useDispatch()
  return (
    <>
    <div className='p-4'>
        <Card style={{ width: '18rem', height:"100%" }}>
          <Link to={`/book-details/${book._id}`}><Card.Img variant="top" src={`${serverurl}/uploads/${book?.bookImg}`} alt='no img' height={"200px"}/></Link>
          <Card.Body className=''>
            <Card.Title className='text-center text-danger fs-2 fw-bold'>₹{book.price}</Card.Title>
            <Card.Text>
              <h6 className='text-center fw-bold border-bottom pb-3'>{book.title}</h6>
              <p className='fw-medium'>Authors : <span className='text-primary'>{book.authors}</span></p>
              <p className='fw-medium'>Genre : <span className='text-primary'>{book.genre}</span></p>
            </Card.Text >
            <button className='btn btn-primary w-100' onClick={()=>dispatch(addToCart(book))}>Add to Cart</button>
          </Card.Body>
        </Card> 
    </div>
    </>
  )
}

export default BookCard