import { commonApi } from "./commonApi"
import { serverurl } from "./serverUrl"


export const registerApi = async(reqBody) =>{
    return await commonApi('POST',`${serverurl}/register`,reqBody,'')
}

export const loginApi = async(reqBody) =>{
    return await commonApi('POST',`${serverurl}/login`,reqBody,'')
}

export const addBookApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverurl}/add-book`,reqBody,reqHeader)
}

export const allBooksApi = async(searchKey)=>{
    return await commonApi('GET',`${serverurl}/all-books?search=${searchKey}`,"","")
}

export const homeBooksApi = async()=>{
    return await commonApi('GET',`${serverurl}/home-books`,"","")
}

export const userBooksApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverurl}/user-books`,"",reqHeader)
}

export const removeUserBooksApi = async(id)=>{
    return await commonApi('DELETE',`${serverurl}/delete-userbooks/${id}`,{},"")
}

export const getABookApi=async(id)=>{
    return await commonApi('GET',`${serverurl}/view-book/${id}`,"","")
}


export const updateBookApi = async(id,reqBody,reqHeader)=>{
   return await commonApi('PUT',`${serverurl}/edit-book/${id}`,reqBody,reqHeader)
}