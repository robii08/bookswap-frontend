import React, { useEffect, useState } from 'react'
import PayPalButton from '../components/PayPalButton'

function Payment() {
  const [total, setTotal] = useState(0)
  useEffect(()=>{
          if(sessionStorage.getItem("total")){
              setTotal(sessionStorage.getItem("total"))
          }  
      },[])
  return (
    <>
        <div className="App d-flex justify-content-center align-items-center flex-column p-5 m-5">
            <h3 className='fw-bold py-5 text-success'>PayPal Payment Gateway</h3>
            <PayPalButton style={{ layout: "horizontal" }} total={total} />
        </div>
    </>
  )
}

export default Payment