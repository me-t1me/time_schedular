import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Calender from './Calender';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewFacility = () => {
  const [event, setEvent] = useState([])
  const [name, setName] = useState("")
  const {id} = useParams();
// const id = props.match.params.id
    useEffect(() => {
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/space/'+id,
            headers: { }
        };
        console.log(config)
        
        axios.request(config)
        .then((response) => {
        setName(response.data.name)
        let slots = response.data.slots;
        let i = 1;
        let result = []
        if (slots.length > 0) {
            slots.forEach(element => {
            if (element != "dummy") {
                let a = {
                    event_id: i,
                    title: "",
                    startDate: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
                    endDate: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
                    facilityId: "",
                    withEmail: "",
                    withId: "",
                    slot: element
                }
                i = i + 1
                let [timeDate, facility, user] = element.split("&")
                let [time, date] = timeDate.split("@")
                time = time.substr(5)
                a["startDate"] = new Date(time.replace(/-/g, " ") + " " + date);
                let date2 = String(parseInt(date.split(":")[0]) + 1) + ":00"
                a["endDate"] = new Date(time.replace(/-/g, " ") + " " + date2)
                facility = facility.split("=")[1]
                user = user.split("=")[1]
                a["withId"] = user
                a["facilityId"] = facility
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:8080/user/'+user,
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                };

                axios.request(config)
                    .then((response) => {
                        a["withEmail"] = response.data.email;
                        let config1 = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: 'http://localhost:8080/space/'+facility,
                            headers: { }
                            };

                            axios.request(config1)
                            .then((response) => {
                                // console.log(response.data.name)
                            a["title"] = response.data.name;
                            result.push(a)
                            setEvent(result)
                            })
                            .catch((error) => {
                            console.log(error);
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }
        });
        }
        else {
            setEvent([])
        }
        })
        .catch((error) => {
        console.log(error);
        });
        
            

    }, [])
  return (
   <div className='container'>
     <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
    <h1>Viewing... {name}</h1>
    <div className='user'><Calender Events={event}/></div>
    </div>
    
  )
}

export default ViewFacility