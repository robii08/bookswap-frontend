import React, { useEffect, useState } from 'react'
import add from '../assets/add.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBookApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';


  function AddBooks() {
    const [preview,setPreiview] = useState('')
    const navigate = useNavigate()
    const [bookDetails, setBookDetails] = useState({
      title:"",
      authors:"",
      price:"",
      language:"",
      genre:"",
      description:"",
      bookImg:""
  })

  const handlefile=(e)=>{
    console.log(e.target.files[0]);
    setBookDetails({...bookDetails,bookImg:e.target.files[0]})
  }
  console.log(bookDetails);
  

  const handleAdd=async()=>{
    const{title, authors,price, language, genre, description, bookImg}=bookDetails
    if(!title || !authors || !price || !genre || !bookImg){
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
      reqBody.append("bookImg",bookImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
         "Content-Type":"multipart/form-data",
         "Authorization": `Bearer ${token}`
        }
        const result = await addBookApi(reqBody,reqHeader)
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

  
  const handleCancel=()=>{
    setBookDetails({
      title:"",
      authors:"",
      price:"",
      language:"",
      genre:"",
      description:"",
      bookImg:""
    })
    setPreiview("")
  }

  useEffect(()=>{
    if(bookDetails.bookImg){
      setPreiview(URL.createObjectURL(bookDetails.bookImg))
    }
  },[bookDetails.bookImg])


  return (
    <>
            <div className='container-fluid' style={{height:'100vh'}}>
              <div className="row p-md-5 p-0">
                <div className="col-md-6 p-4 p-md-0 d-flex justify-content-center align-items-center">
                  <label htmlFor='bookImg'>
                    <input type="file" id='bookImg' style={{display:"none"}} key={preview}  onChange={(e)=>{handlefile(e)}}/> 
                    <img src={preview? preview:add} alt="no image" className='w-75'/>
                  </label>    
                </div>
                <div  className='col-md-6 p-md-5 p-4 d-flex justify-content-center align-items-center'>
                  <div className='w-100 p-md-5 p-0'>
                    <div className="mb-3">
                      <input type="text" className='form-control' placeholder='Title' value={bookDetails.title} onChange={(e)=>{setBookDetails({...bookDetails,title:e.target.value})}} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className='form-control' placeholder='Author' value={bookDetails.authors} onChange={(e)=>{setBookDetails({...bookDetails,authors:e.target.value})}} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className='form-control' placeholder='Genre' value={bookDetails.genre} onChange={(e)=>{setBookDetails({...bookDetails,genre:e.target.value})}} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className='form-control' placeholder='Price' value={bookDetails.price} onChange={(e)=>{setBookDetails({...bookDetails,price:e.target.value})}} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className='form-control' placeholder='Language'  value={bookDetails.language} onChange={(e)=>{setBookDetails({...bookDetails,language:e.target.value})}}/>
                    </div>
                    <div className="mb-3">
                      <textarea type="text" className='form-control' placeholder='Description'value={bookDetails.description} onChange={(e)=>{setBookDetails({...bookDetails,description:e.target.value})}} />
                    </div>
                    <div className="mb-3">
                      <button className='btn btn-primary w-100' onClick={handleAdd}>Add</button>
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

export default AddBooks