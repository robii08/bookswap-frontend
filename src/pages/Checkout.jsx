import React, { useEffect, useState } from 'react'
import del from "../assets/del.webp"
import { Link } from 'react-router-dom'

function Checkout() {
    const [confirm, setConfirm] = useState(false)
    const [address, setAddess] = useState({
        name:"",
        flat:"",
        place:"",
        pin:""
    })
    const [total, setTotal] = useState(0)

    const confirmation=()=>{
        setConfirm(true)
    }

    const clear=()=>{
        setAddess({
            name:"",
            flat:"",
            place:"",
            pin:""
        })
    }
    const back=()=>{
        setConfirm(false)
    }

    useEffect(()=>{
        if(sessionStorage.getItem("total")){
            setTotal(sessionStorage.getItem("total"))
        }  
    },[])

  return (
    <>

    
<div className="container-fluid" style={{marginTop: "100px"}}>
    <h1 className="text-center text-danger fw-bold">Delivery Address</h1>
    <div className="row my-5">
        <div className="col-md-1"></div>
        <div className="col-md-5 d-flex justify-content-center">
            <div className='p-3'><img src={del} className='w-100' alt="no image"/></div>
        </div>
        <div className="col-md-5">
            {
            !confirm?
                <form className="p-md-5 p-4 shadow rounded" >
                <div className="form-floating mb-3">
                    <input type="text" className="form-control shadow"  placeholder="name@example.com" onChange={(e)=>setAddess({...address,name:e.target.value})} value={address.name} />
                    <label for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control shadow"  onChange={(e)=>setAddess({...address,flat:e.target.value})} placeholder="name@example.com" value={address.flat} />
                    <label for="floatingInput">Apartment/flat:no</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control shadow"  onChange={(e)=>setAddess({...address,place:e.target.value})} placeholder="name@example.com" value={address.place}/>
                    <label for="floatingInput">Place</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="text" className="form-control shadow"  onChange={(e)=>setAddess({...address,pin:e.target.value})} placeholder="name@example.com" value={address.pin}/>
                    <label for="floatingInput">Pincode</label>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <button className="btn btn-danger shadow px-4" onClick={clear}><i className="fa-solid fa-angles-left me-2"></i>clear</button>
                    <button onClick={confirmation} className="btn btn-success shadow">Confirm <i className="fa-solid fa-angles-right ms-2"></i></button>
                </div>
            </form>
            :
            <div  className="p-4">
                <h2 className='text-danger fw-bold mb-3'>Confirm Address</h2>
                <h3><span className='text-dark fw-bold'>Name :</span> {address.name} </h3>
                <h3><span className='text-dark fw-bold'>Apartment/Flat :</span> {address.flat}</h3>
                <h3><span className='text-dark fw-bold'>Place :</span> {address.place}</h3>
                <h3><span className='text-dark fw-bold'>Pincode : </span>{address.pin}</h3>

                <h2 className='text-danger fw-bold mt-3'>grandTotal : ₹{total}</h2>
                <div className="d-flex justify-content-between my-5 ">
                    <button  className="btn btn-danger shadow px-4" onClick={back}><i className="fa-solid fa-angles-left me-2"></i>Back</button>
                    <Link to={'/payment'}><button className="btn btn-success shadow">Proceed <i className="fa-solid fa-angles-right ms-2"></i></button></Link>
                </div>
            </div>
            }
        </div>
        <div className="col-md-1"></div>
    </div>
</div>
        
       
    </>
  )
}

export default Checkout