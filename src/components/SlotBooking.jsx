import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./SlotBooking.css"

const SlotBooking = () => {
    const [people, setPeople] = useState([])
    const [facility, setFacility] = useState([])
    const [person, setPerson] = useState("")
    const [fac, setFac] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    useEffect(() => {
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/space/',
        headers: { }
        };
        
        axios.request(config)
        .then((response) => {
        // console.log(JSON.stringify(response.data));
        let res = []
        response.data.forEach((e) => {
            const {id, name} = e;
            const temp = {
                id,
                name
            }
            res.push(temp)
        })
        setFacility(res)
        })
        .catch((error) => {
        console.log(error);
        });

        let config1 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/user/',
            headers: { }
            };

        axios.request(config1)
            .then((response) => {
            let res = []
            response.data.forEach((e) => {
                const {id, name} = e;
                const temp = {
                    id,
                    name
                }
                if (id != localStorage.getItem("id")){
                    res.push(temp)
                }
                
            })
            setPeople(res)
            })
            .catch((error) => {
            console.log(error);
        });


    }, [])

    const handleSubmit = () => {
        // e.preventDefault();  
        console.log(date, time, fac, person)
        const id = toast.loading("Please wait...")
        let data = JSON.stringify({
            "id": fac,
            "slots": [
                "time="+date+ "@" + time + ":00&user1=" + localStorage.getItem("id") + "&user2=" + person + "/"
            ]
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/space/update',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
            const code = response.data.name
            if (code == "fno") {
                const fname = facility.find((i) => i.id == fac).name
                toast.update(id, {render: fname + " not available", type: "error", isLoading: false });
                
            } else if (code == "uno1") {
                toast.update(id, {render: "You are" + " not available", type: "error", isLoading: false});
            } else if (code == "uno2") {
                 const uname = people.find((i) => i.id == person).name
                toast.update(id, {render: uname + " not available", type: "error", isLoading: false});
                
            } else {
                toast.update(id, {render: "Slot booked!🥳", type: "success", isLoading: false});
                setTimeout(() => {window.location.reload()}, 3000)
            }
            })
            .catch((error) => {
            console.log(error);
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
        <h1>Add your slot here</h1>
        <label htmlFor="date">Date</label>
        <input value={date} name="date" onChange={(e) => setDate(e.target.value)} id="date" placeholder="ex. 2023-02-05" required/>
        <label htmlFor="hour">Hour</label>
        <input value={time} name="hour" onChange={(e) => setTime(e.target.value)} id="hour" placeholder="ex. 13" required/>
        <label htmlFor="person">Choose whom to book the slot with</label>
            <select
                type="person"
                required
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                >
                    <option value="">Please choose a member</option>
                    {
                        people.map((e, i) => <option key={i} value={e.id} >{e.name}</option>)
                    }
            </select>
        <label htmlFor="facility">Choose a facility</label>
            <select
                type="facility"
                required
                value={fac}
                onChange={(e) => setFac(e.target.value)}
                >
                    <option value="">Please choose a facility</option>
                    {
                        facility.map((e, i) => <option key={i} value={e.id} >{e.name}</option>)
                    }
            </select>
        <button onClick={handleSubmit}>Add slot</button>
    </div>
  )
}

export default SlotBooking