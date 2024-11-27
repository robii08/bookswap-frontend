import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import MyBooks from '../components/MyBooks'
import bg from '../assets/bg.jpeg'
import lock from "../assets/lock.webp";

import { Link } from 'react-router-dom'

function Profile() {
  const [token, setToken] = useState("")



  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }  
},[])
  return (  
    <>

      
            
    <div className='container-fluid bg'>
      
        {token?
        <div className="row p-5">
            <div className="col-md-1"></div>
            <div className="col-md-10 bg-primary  rounded-5 p-4 d-flex align-items-center justify-content-between ">
                <img src={profile} alt=""  className='ms-5' height={'100px'}/>
                <h5 className='fw-bold text-light me-4'>Contact : 9447541052 </h5>
            </div>
            <div className="col-md-1"></div>
            <MyBooks/> 
        </div>
        :
        <div className='pt-5 w-100 row' >
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

export default Profile