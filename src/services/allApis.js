import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonRqst";


// register
export const empRegister = async (body,headers)=>{
    return commonRequest("POST",`${BASE_URL}/employee/register`,body,headers)
}

// get all users api 
export const getusersapi=async(searchKey)=>{
  return await commonRequest("GET",`${BASE_URL}/employee/get-all-employee-details?search=${searchKey}`,"")
}


// view profile
export const viewProfile = async (id)=>{
  return await commonRequest("GET",`${BASE_URL}/employee/view-Profile/${id}`,"")
}

// delete particular data 
export const removeUser = async(id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})

}


// edit user
export const updateUser = async(id,body,headers)=>{
  return commonRequest("PUT",`${BASE_URL}/employee/update/${id}`,body,headers)

}
