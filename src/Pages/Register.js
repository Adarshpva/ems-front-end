import React,{useContext, useEffect, useState} from 'react'
import { Alert, Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import LoadingSpinner from '../Components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { empRegister } from '../services/allApis';
import {useNavigate} from  'react-router-dom';
import {registerContext} from '../Components/ContextShare'

function Register() {

  // err msg
  const [errorMsg,seterrorMsg]=useState("")

  // to get context
 const {registerData,setregisterData} = useContext(registerContext)

  // use navigate  hook
  const navigate = useNavigate()

      // create state to display spinner
      const [showSpin, setShowSpin] = useState(true)



  // status dropdown option
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ];

  // create state to hold user input data
  const [userdata,setuserdata] = useState({

    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  // create state for status
  const [status,setStatus] = useState("Active")

  // create state to hold image
  const [image,setImage] = useState("")

  // create to hold profile picture
  const[preview,setPreview]=useState("")


  // to update userdata when user enter the input using html
  const userDetails=(e)=>{
    const {name,value}=e.target
    setuserdata({...userdata,[name]:value})
  }

  // to update status state
  const updateState=(e)=>{
    setStatus(e.value)
  }

  // update image state
  const setProfile =(e)=>{
    setImage(e.target.files[0])

  }


  // console.log(userdata);
  // console.log(status);
  // console.log(image);

  useEffect(()=>{

    if(image){
      // update preview picture
      setPreview(URL.createObjectURL(image))
    }
    // set showSpin as false after 2 sec
    setTimeout(()=>{
        setShowSpin(false)
    },2000);
},[image]) 

// defining register submission
const handleSubmit=async (e)=>{
  
  // prevent clic event to stop reload
  e.preventDefault()
  // get user inpu data from form
  const {fname,lname,email,mobile,gender,location} = userdata
  if(fname===""){
    toast.warning("First Name Required")
  }
  else if(lname===""){
    toast.error("Last Name Required")
  }
  else if(email===""){
    toast.error("E-mail  Required")
  }
  else if(mobile===""){
    toast.error("Mobile  Required")
  }
  else if(gender===""){
    toast.error("Gender  Required")
  }
  else if(image===""){
    toast.error("Image  Required")
  }
  else if(location===""){
    toast.error("Location  Required")
  }
  else{
    // make register api call

    // headerconfig
    const headerConfig={
      "Content-Type":"multipart/form-data"
    }
    // body - form data\
    const data = new FormData()
    data.append("user_profile",image)
    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("status",status)
    data.append("location",location)

    // api call

    const response = await empRegister(data,headerConfig)
if(response.status===200){
  // reset all states
  setuserdata({...userdata,
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""

  })
  setStatus("")
  setImage("")

  // shatre response dat to other component via context
  setregisterData(response.data)

  // navigate to home page
  navigate('/')
}
else{
  seterrorMsg("Error")
}

  }

}

  return (
    <>
    {
      errorMsg?<Alert variant='danger' className='bg-primary' onClose={()=>seterrorMsg("")} dismissible>{errorMsg}</Alert>:""
    }
    {
      showSpin? <LoadingSpinner/>:

      <div className="container mt-5">
        <h2 className='text-center mt-3'>Register Employee Details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className="text-center mb-3">
            <img className='rounded-circle' width={'100px'} height={'100px'} src={preview?preview:"https://cdn-icons-png.flaticon.com/512/219/219988.png"} alt="profile" />

          </div>
          <Form>
            <Row>

              {/* first name */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name" 
                  name="fname"
                  value={userdata.fname}
                  onChange={userDetails}
                />
              </Form.Group>

              {/* last name */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lname"
                  value={userdata.lname}
                  onChange={userDetails}

                />
              </Form.Group>

              {/* e mail */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>E mail Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userdata.email}
                  onChange={userDetails}

                />
              </Form.Group>

              {/* mobile */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={userdata.mobile}
                  onChange={userDetails}

                />
              </Form.Group>

              {/* gender */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  required
                  type={'radio'}
                  label={'Male'}
                  name="gender"
                  value={'Male'}
                  onChange={userDetails}

                />
                <Form.Check
                  required
                  type={'radio'}
                  label={'Female'}
                  name="gender"
                  value={'Female'}
                  onChange={userDetails}


                />

              </Form.Group>

              {/* status */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>Select Employees Options</Form.Label>
                <Select options={options} defaultInputValue={status} onChange={updateState}/>

              </Form.Group>

              {/* upload photo */}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>Choose Profile Photo</Form.Label>
                <Form.Control
                  name="user_profile"
                  required
                  type="file"
                  onChange={setProfile}
                />
              </Form.Group>

              {/* location*/}
              <Form.Group className='col-lg-6 mb-3'>
                <Form.Label>Enter Employee Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Employee Location"
                  name="location"
                  value={userdata.location}
                  onChange={userDetails}

                />
              </Form.Group>

              {/* submit button */}
              <Button onClick={handleSubmit} className='btn btn-primary mt-3'>
                Submit
              </Button>


            </Row>
          </Form>

        </Card>
      </div>
}
<ToastContainer position='top-center'/>
    </>
  )
}

export default Register