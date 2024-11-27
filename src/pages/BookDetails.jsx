import React, { useEffect, useState } from 'react'
import { getABookApi } from '../services/allApi'
import { useParams } from 'react-router-dom';
import { serverurl } from '../services/serverUrl';

function BookDetails() {
    const {id} = useParams()
    const [book,setBook] = useState({})
    
    
    const getProduct = async(id)=>{
        const result = await getABookApi(id)
        setBook(result.data);
    }

    useEffect(()=>{
        getProduct(id)
    },[])

  return (
    <>
{/* <section className="py-5">
    <div className="container py-5">
        <div className="row">
            <div className="col-md-6 px-md-5 px-0">
                <img src={`${serverurl}/uploads/${book.bookImg}`} alt="..." width={"100%"} height={"50%"} />
            </div>
            <div className="col-md-6 px-md-5 px-0">
                <div className="fw-bold"><span className='fw-medium'>Product Id : </span>{book._id} </div>
                <div className="fs-5 py-4">
                    <span className="fs-1 fw-bold text-danger">₹{book.price} </span>
                </div>
                <h5 className='text-dark fw-bold pb-2'><span className='fw-medium'>Title : </span>{book.title}</h5>
                <h5 className='text-dark fw-bold pb-2'><span className='fw-medium'>Authors : </span>{book.authors}</h5>
                <h5 className='text-dark fw-bold'><span className='fw-medium'>Genre : </span>{book.genre}</h5>
                
                <div className="d-flex justify-content-between mt-5">
                    <a  className="btn btn-outline-danger px-md-4 me-md-0 me-2 d-flex align-items-center"><i className="fa-solid fa-heart me-2"></i>wishlist</a>
                    <a  className="btn btn-outline-primary"><i className="fa-solid fa-cart-shopping me-2"></i>add to cart</a>
                </div>
            </div>
        </div>
    </div>
</section> */}

<section className="py-md-5 py-0 pb-md-0 pb-5">
    <div className="container details">
        <div className="row">
            {/* Left Column - Image */}
            <div className="col-md-6 col-12 px-md-5 d-flex align-items-center px-0 order-md-1 order-1" style={{height:"80vh"}}>
                <img 
                    src={`${serverurl}/uploads/${book.bookImg}`} 
                    alt={book.title || "Book cover"} 
                    className="image" 
                    width={"100%"}
                    height={"80%"}

                />
            </div>

            {/* Right Column - Book Details */}
            <div className="col-md-6 col-12 px-md-5 d-flex align-items-center px-3 py-2 px-0 order-md-2 order-2">
                <div>
                    <div className="fw-bold">
                        <span className="fw-medium">Product Id: </span>{book._id}
                    </div>
                    <div className="fs-5 py-4">
                        <span className="fs-1 fw-bold text-danger">₹{book.price}</span>
                    </div>
                    <h5 className="text-dark fw-bold pb-2">
                        <span className="fw-medium">Title: </span>{book.title}
                    </h5>
                    <h5 className="text-dark fw-bold pb-2">
                        <span className="fw-medium">Authors: </span>{book.authors}
                    </h5>
                    <h5 className="text-dark fw-bold pb-2">
                        <span className="fw-medium">Genre: </span>{book.genre}
                    </h5>
                    <h5 className="text-dark fw-bold pb-2">
                        <span className="fw-medium">Description: </span>{book.description}
                    </h5>
    
                    {/* Buttons */}
                    <div className="d-flex flex-wrap justify-content-between mt-5">
                        <a 
                            className="btn btn-outline-danger px-md-4 w-100 w-md-auto mb-2 mb-md-0 d-flex justify-content-center align-items-center"
                        >
                            <i className="fa-solid fa-heart me-2"></i>Buy
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    </>
  )
}

export default BookDetails