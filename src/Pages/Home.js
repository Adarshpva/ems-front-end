import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import { deleteContext, editContext, registerContext } from '../Components/ContextShare'
import { getusersapi, removeUser } from '../services/allApis'

function Home() {

        // get editcontext using usecontext
        const {editData,seteditData}=useContext(editContext)


    // get deletecontext using usecontext
    const {deleteData, setdeleteData} = useContext(deleteContext)

    // state to search
    const [searchKey, setsearchKey] = useState("")
    console.log(searchKey);

    // state to hold all users
    const [allusers, setallusers] = useState([])


    // define delete user
    const deleteUser= async (id)=>{
        console.log("Inside Delete Function");
        // make api call to make services
        const res = await removeUser(id)
        console.log(res);
        if(res.status===200){
            // data successfully removed
            setdeleteData(res.data)
            // call get user details
         getusersDetails()


        }
        else{
            console.log("Error");
        }
    }


    // define a function to call getallusers api
    const getusersDetails = async () => {
        const serverResponse = await getusersapi(searchKey)
        // console.log(serverResponse);
        setallusers(serverResponse.data)


    }
    // console.log(allusers);


    // get register conttext using usecontext
    const { registerData, setregisterData } = useContext(registerContext)



    // create state to display spinner
    const [showSpin, setShowSpin] = useState(true)

    // naviaget to another page-useNavigate
    const navigate = useNavigate()

    // to redirect to register page when add btn clicked
    const addUser = () => {
        // navigate to register
        navigate('/register')

    };
    useEffect(() => {
        // call get user details
        getusersDetails()
        // set showSpin as false after 2 sec
        setTimeout(() => {
            setShowSpin(false)
        }, 2000);
    }, [searchKey])

    console.log(registerData);
    return (

        <>
            {
                registerData ? <Alert className='bg-primary' variant='success' onClose={() => setregisterData("")} dismissible>{registerData.fname.toUpperCase()} Successfully Registered.... </Alert> : ""
            }
            {
                editData ? <Alert className='bg-primary' variant='success' onClose={() => seteditData("")} dismissible>{editData.fname.toUpperCase()} Successfully Updated.... </Alert> : ""
 
            }
            {
                deleteData ? <Alert className='bg-warning' variant='danger' onClose={() => setdeleteData("")} dismissible>{deleteData.fname.toUpperCase()} Successfully Deleted!!! </Alert> : ""
            }


            <div className='container mt-5'>
                <div className="first-div">
                    {/* search/ add btn */}
                    <div className="search_add d-flex justify-content-between">
                        {/* search */}
                        <div className="search col-md-4">
                            <form className='d-flex'>
                                <Form.Control onChange={e => setsearchKey(e.target.value)} type="text" placeholder="Search here" />
                                <Button className='ms-2' varient="success">Search</Button>
                            </form>
                        </div>
                        {/* add btn */}
                        <div className="add">
                            <button onClick={addUser} className="btn btn-primary"><i className="fa-solid fa-user-plus fa-fade me-2"></i>Add</button>
                        </div>
                    </div>
                </div>
                <div className="sec-div mt-3">
                    {
                        showSpin ?
                            <div>
                                <LoadingSpinner />
                            </div> :

                            <div>
                                <h2>List Of Employees</h2>
                                {/* table */}
                                <HomeTable displayData={allusers} 
                                handleDelete = {deleteUser}
                                />
                            </div>
                    }
                </div>

            </div>

        </>
    )
}

export default Home