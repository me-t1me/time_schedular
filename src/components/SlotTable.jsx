import React from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import "./SlotTable.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SlotTable = ({Events}) => {
    console.log(Events)
    const handleClick = (slot, id) => {
        const tid = toast.loading("Please wait...")
        console.log(slot, id)
        let [timeDate, facility, user] = slot.split("&")
        console.log(slot.split("&"))
        let s = timeDate+"&user1="+localStorage.getItem("id")+"&user2="+user.split("=")[1] + "/"
        let data = JSON.stringify({
        "id": id,
        "slots": [
           s
        ]
        });
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/space/deleteslot',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        console.log(config)
        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.update(tid, {render: "Slot deleted successfully", type: "success", isLoading: false});
        })
        window.location.reload()
        .catch((error) => {
        console.log(error);
        toast.update(tid, {render: "There seems to be some problem", type: "error", isLoading: false});
        });

    }

    const columns = [
        {
            name: "User",
            selector: row => <Link to={"/view/"+row.withId}>{row.withEmail}</Link>
        },
        {
            name: "Facility",
            selector: row => <Link to={"/viewfacility/"+row.facilityId}>{row.title}</Link>
        },
        {
            name: "Date",
            selector: row => row.startDate.getFullYear() + "-" + String(row.startDate.getMonth() + 1) + "-"+ row.startDate.getDate()
        }, 
        {
            name: "Time",
            selector: row => row.startDate.getHours() + ":" +  row.startDate.getMinutes() + "0"
        }, 
        {
            name: "Action",
            selector: row => <button value={row.facilityId} onClick={() => handleClick(row.slot, row.facilityId)}>Delete</button>
        }
    ]
  return (
    <div className='container'>
         < DataTable 
            columns={columns} 
            data={Events} 
            fixedHeader 
            fixedHeaderScrollHeight='400px'
            title="Slots"
            highlightOnHover
        />
    </div>
  )
}

export default SlotTable    