import React,{useEffect, useState} from 'react'
import { Card, Row } from 'react-bootstrap'
import LoadingSpinner from '../Components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { viewProfile } from '../services/allApis';
import { BASE_URL } from '../services/base_url';

function Profile() {

  // create a state to hold userdetails
   const [userDetails,setuserdetails] =useState({})

  // use params to get path parameter to route
  const {id} = useParams()

        // create state to display spinner
        const [showSpin, setShowSpin] = useState(true)

        // define function to get profile for a specific user
        const getProfile= async ()=>{
          // api call
          const {data}= await viewProfile(id)
          setuserdetails(data);

        }


        useEffect(()=>{
          // call getprofile function
          getProfile()
          // set showSpin as false after 2 sec
          setTimeout(()=>{
              setShowSpin(false)
          },2000);
      },[]);
      
  return (
    <>
{ showSpin? <LoadingSpinner/>:

<div className="container mt-5">
  <Card className='shadow col-lg-6 mx-auto '>
       <Card.Body>
          <Row>
            <div className="col">
              <div className="profile_img d-flex justify-content-center">
              <img className=' border p-1 rounded-circle' width={'200px'} height={'200px'} src= {`${BASE_URL}/uploads/${userDetails.profile }`}alt="profile" />


              </div>
            </div>
          </Row>
          <div className="text-center mt-3">
            <h3>{userDetails.fname} {userDetails.lname}</h3>
            <h5> <i class="fa-solid fa-envelope fa-bounce text-primary  ms-1"></i> :- {userDetails.email} </h5>
            <h5> <i class="fa-solid fa-address-book fa-bounce text-warning"></i> :- {userDetails.mobile} </h5>
            <h5> <i class="fa-solid fa-venus-mars fa-bounce text-danger"></i> :- {userDetails.gender}</h5>
            <h5> <i class="fa-solid fa-location-dot fa-bounce text-info"></i> :- {userDetails.location}</h5>
            <h5> <i class="fa-solid fa-chart-line fa-bounce text-success"></i> :- {userDetails.status} </h5>


          </div>
       </Card.Body>
  </Card>
</div>
}
    </>
  )
}

export default Profile