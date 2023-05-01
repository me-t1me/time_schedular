import React, { useState } from "react";
import axios from "axios";
import "./register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, pass, repass, name, type)
        if (pass != repass) {
            toast("Password and re-enterd password are not same")
            return
        }
        if (!email.includes("bits-pilani.ac.in")) {
            toast("Only BITS email ID can register")
            return 
        }
        console.log(email);
        let data = JSON.stringify({
            "name": name,
            "email": email,
            "password": pass,
            "type": type,
            "slots": [
                "dummy"
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/user/register',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        const id = toast.loading("Please wait...")
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if (response.data.id == null){
                    toast.update(id, {render: "Email has been registered already", type: "error", isLoading: false});
                } else {
                    toast.update(id, {render: "User registered successfully", type: "success", isLoading: false});
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className="auth-form-container">
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
            <h2 className="header">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" required/>
                <label htmlFor="email" required>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
                <label htmlFor="repassword">Re-enter Password</label>
                <input value={repass} onChange={(e) => setRepass(e.target.value)} type="password" placeholder="********" id="repassword" name="repassword" required />
                <label htmlFor="type">Role</label>
                <select
                type="type"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Please choose a role</option>
                    <option value="student">student</option>
                    <option value="staff">staff</option>
                </select>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Register