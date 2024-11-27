import React, { createContext, useState } from 'react'

export const searchContext =createContext("")
export const loginContext = createContext(true)
function Contextshare({children}) {
    //children is a predefined props
    const [searchKey,setSearchKey] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
  return (
    
    <loginContext.Provider value={{loginStatus, setLoginStatus}}>
      <searchContext.Provider value={{searchKey,setSearchKey}}>
        {children}
      </searchContext.Provider>
    </loginContext.Provider>      
  )
}

export default Contextshare