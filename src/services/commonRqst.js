import axios from 'axios';

export const commonRequest= async(method,url,body,header)=>{
    let config ={
        method,
        url,
        headers:header?header:{
            "Content-Type":"application/json"
        },
        data:body

    }
    // request instance
    return axios(config).then(Response=>{
      console.log(Response);
      return Response  
    }).catch(err=>{
        console.log(err);
        return err
    })
}