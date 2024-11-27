import React, { useEffect, useState } from 'react'
import EditBooks from '../pages/EditBooks'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{ faCircleXmark,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { removeUserBooksApi, userBooksApi } from '../services/allApi';

function MyBooks() {
    const [userBooks, setUserBooks] = useState([])
    const [deleteStatus, setDeleteStatus] = useState(false)

    const getUserBooks = async() =>{
        const token = sessionStorage.getItem("token")
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userBooksApi(reqHeader)
        setUserBooks(result.data);  
    }

    const handleDelete = async(id) =>{
        const result = await removeUserBooksApi(id)
        if(result.status==200){
            toast.success("deleted successfully")
            setDeleteStatus(true)
          }      
    }

    useEffect(()=>{
        getUserBooks() 
        setDeleteStatus(false) 
      },[deleteStatus])

  return (
    <>
    <div className='container-fluid '>
        <div className="row pb-5 mt-5">
            <div className="col-md-1"></div>
            <div className="col-md-10">
                <div className='text-center my-3'>
                    <h1 className='fw-bold text-light'>My Collections</h1>
                    <Link to={'/add'} className='text-light text-success'><p>Add a Book</p></Link>
                </div>
              
               {userBooks?
                <table className='table table-striped text-center'>
                        <thead >
                            <tr>                                
                                <th className='text-danger fw-bold'>BOOK TITLE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='shadow'>
                          
                            {userBooks.map((item)=>
                            <tr className='text-success shadow'>
                                <th>{item.title}</th>
                                <th>
                                <div className='d-flex align-items-center justify-content-center '>
                                    <Link to={`/edit/${item._id}`}><FontAwesomeIcon icon={faPenToSquare} className="text-primary me-2"/></Link>
                                    <FontAwesomeIcon onClick={()=>handleDelete(item._id)} icon={faCircleXmark} className='ms-3 text-danger' />
                                </div>
                                </th>
                            </tr>)
                            }
                        </tbody>
                    </table>
                    :
                    <p>Nothing to show</p> 
                }  
                
                
            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
    <ToastContainer autoClose={2000} theme="coloured" position='top-center' />
    </>
  )
}

export default MyBooks