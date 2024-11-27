import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import add from '../assets/add.png'
import { useNavigate, useParams } from 'react-router-dom';
import { getABookApi, updateBookApi } from '../services/allApi';
import { serverurl } from '../services/serverUrl';


function EditBooks() {
  const {id} = useParams()
  const [book,setBook] = useState({})
  const [preview,setPreiview] = useState('')
  const navigate = useNavigate()
  const [bookDetails, setBookDetails] = useState({})

console.log(book);


const getProduct = async(id)=>{
  const result = await getABookApi(id)  
  setBook(result.data); 
  setBookDetails({
    title:book.title,
    authors:book.authors,
    price:book.price,
    language:book.language,
    genre:book.genre,
    description:book.description,
    bookImg:""
  })
}

const handlefile=(e)=>{
  setBookDetails({...bookDetails,bookImg:e.target.files[0]})
}
console.log(bookDetails);


const handleEdit=async()=>{
  const{title, authors,price, language, genre, description, bookImg}=bookDetails
  if(!title || !authors || !price || !genre ){
    toast.warning('please fill the form completely')
  }
  else{
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("authors",authors)
    reqBody.append("price",price)
    reqBody.append("language",language)
    reqBody.append("genre",genre)
    reqBody.append("description",description)
    preview?reqBody.append("bookImg",bookImg):reqBody.append("bookImg",book.bookImg)

    const token = sessionStorage.getItem("token")
    if(token){
      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
         }
         const result = await updateBookApi(book._id,reqBody,reqHeader)
         console.log(result);
         if(result.status==200){
           
           toast.success("book added successfully")
           navigate('/books')
           handleCancel()
         }
         else{
           toast.error("something went wrong")
         }
      }
      else{
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
         }
         const result = await updateBookApi(book._id,reqBody,reqHeader)
         console.log(result);
         if(result.status==200){
           
           toast.success("book added successfully")
           navigate('/books')
           handleCancel()
         }
         else{
           toast.error("something went wrong")
         }
      }
      
    }
  }
}


const handleCancel=()=>{
  setBookDetails({
    title:book.title,
    authors:book.authors,
    price:book.price,
    language:book.language,
    genre:book.genre,
    description:book.description,
    bookImg:""
  })
  setPreiview("")
}

useEffect(()=>{
  if(bookDetails.bookImg){
    setPreiview(URL.createObjectURL(bookDetails.bookImg))
  }
},[bookDetails.bookImg])


useEffect(()=>{
  getProduct(id)
},[book])



return (
  <>
          <div className='container-fluid'>
            <div className="row p-md-3 p-0">
              <div className="col-md-6 p-4 p-md-0 d-flex justify-content-center align-items-center">
                <label htmlFor='bookImg'>
                  <input type="file" id='bookImg' style={{display:"none"}} key={preview}  onChange={(e)=>{handlefile(e)}}/> 
                  <img src={preview? preview:`${serverurl}/uploads/${book.bookImg}`} alt="no image" width={"100%"} height={"430px"}/>
                </label>    
              </div>
              <div  className='col-md-6 p-md-3 p-4 d-flex justify-content-center align-items-center'>
                <div className='w-75 p-md-5 p-0'>
                  <div className="mb-3">
                    <input type="text" className='form-control fw-medium' placeholder='Title' value={bookDetails.title} onChange={(e)=>{setBookDetails({...bookDetails,title:e.target.value})}} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className='form-control fw-medium' placeholder='Author' value={bookDetails.authors} onChange={(e)=>{setBookDetails({...bookDetails,authors:e.target.value})}} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className='form-control fw-medium' placeholder='Genre' value={bookDetails.genre} onChange={(e)=>{setBookDetails({...bookDetails,genre:e.target.value})}} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className='form-control fw-medium' placeholder='Price' value={bookDetails.price} onChange={(e)=>{setBookDetails({...bookDetails,price:e.target.value})}} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className='form-control fw-medium' placeholder='Language'  value={bookDetails.language} onChange={(e)=>{setBookDetails({...bookDetails,language:e.target.value})}}/>
                  </div>
                  <div className="mb-3">
                    <textarea type="text" className='form-control fw-medium' placeholder='Description'value={bookDetails.description} onChange={(e)=>{setBookDetails({...bookDetails,description:e.target.value})}} />
                  </div>
                  <div className="mb-3">
                    <button className='btn btn-primary w-100' onClick={handleEdit}>Update</button>
                  </div>
                  <div className="mb-3">
                    <button className='btn btn-warning w-100' onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>      
    
  <ToastContainer autoClose={2000} theme="coloured" position='top-center' />
  </>
)
}
export default EditBooks