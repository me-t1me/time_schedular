import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SlotBooking.css'

const FacilityAdd = () => {
    const [name, setName] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name)
        const id = toast.loading("Please wait...")
        let data = JSON.stringify({
        "name": name,
        "slots": [
            "dummy"
        ]
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/space/add',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.update(id, {render: name + " added!", type: "success", isLoading: false});
        })
        .catch((error) => {
        console.log(error);
        toast.update(id, {render: "something went wrong", type: "error", isLoading: false});
        });

    }
  return (
    <div className='slot'>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        <h1>Add your Facility here</h1>
        <label htmlFor="name">Name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Swimming Pool" required/>
        <button onClick={handleSubmit}>Register Facility</button>
    </div>
  )
}

export default FacilityAdd