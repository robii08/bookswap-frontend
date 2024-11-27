import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import BookCard from '../components/BookCard'
import lock from "../assets/lock.webp";
import { allBooksApi } from '../services/allApi'
import { searchContext } from '../context/Contextshare'

function Books() {
    const [token, setToken] = useState("")
    const [allBooks, setAllBooks] = useState([])
    const {searchKey, setSearchKey} = useContext(searchContext)

    const getAllBooks = async(searchKey)=>{
        const result = await allBooksApi(searchKey)
        setAllBooks(result.data)
    }
      
    console.log(allBooks);
    

    useEffect(()=>{
        getAllBooks(searchKey)
    },[searchKey])

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }  
    },[])

  return (
    <>
        
        <div className="container-fluid ">
            <h1 className='text-center mt-5'>Let's Explore !!!</h1>

            {token?
            <div>
                <div className="row my-4">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 d-flex">
                    <input type="text" className='form-control' placeholder='genre' onChange={(e)=>setSearchKey(e.target.value)}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginLeft:"-30px",color:"lightgrey",marginTop:"12px"}} />
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mb-5">
                    {allBooks?.length>0 ?
                    allBooks?.map((item)=>(
                    <div className="col-md-3 d-flex justify-content-center p-4">
                        <BookCard book={item}/>
                    </div>))
                    :
                    <p className='text-danger text-center fw-bold'>no books to show</p>
                    }
                    
                </div>
            </div>
            :
        <div className='mt-5 w-100 row' >
        {/* not login */}
            <div className="col-md-2"></div>
            <div className="col-md-8 p-4">
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img src={lock} alt="no image" width={'40%'} height={'40%'} className=''/>
                    <h5 className='mt-5 text-center'>Please <Link to={'/login'} className='text-danger'>Login</Link> to Explore More..</h5>
                </div>
            </div>
            <div className="col-md-2"></div>
        </div>
            }
            
        </div>
    </>
  )
}

export default Books