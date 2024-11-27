import React, { createContext, useState } from 'react'


export const loginContext = createContext(true)
function Contextshare({children}) {
    //children is a predefined props
    
    const [loginStatus, setLoginStatus] = useState(false)
  return (
    
    <loginContext.Provider value={{loginStatus, setLoginStatus}}>
      {children}
    </loginContext.Provider>      
  )
}

export default Contextshare