import React, {useEffect, useState} from "react";
import "./loginform.css"
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";


const LoginForm = () => {
    const [logedin, setLogedin] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reg, setReg] = useState(false);
    function getToken(user){
        if (user) {
            const id = toast.loading("Please wait...")
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log(res.data.email);
                    return axios
                        .post("http://localhost:8080/user/logingoogle", {
                            email: res.data.email
                        })
                })
                .then((result) => {
                    if (result.data.id == null){
                        setEmail("")
                        setPassword("")
                        toast.update(id, {render: "This email is not registered", type: "error", isLoading: false});
                        // setTimeout(2000)
                    } else {
                        localStorage.setItem('id', result.data.id)
                        localStorage.setItem('name', result.data.name)
                        localStorage.setItem('email', result.data.email)
                        localStorage.setItem('type', result.data.type)
                        toast.update(id, {render: "Welcome " + result.data.name +"!🥳", type: "success", isLoading: false});
                        setTimeout(() => {setLogedin(true);}, 3000)
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    const popup = () => {
        let data = JSON.stringify({
            "email": email,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/user/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        const id = toast.loading("Please wait...")
        axios.request(config)
            .then((result) => {
                console.log(JSON.stringify(result.data));
                console.log(result)
                console.log(result.id)
                console.log(result["id"])
                if (result.data.id == null){
                    setEmail("")
                    setPassword("")
                    toast.update(id, {render: "Email and password doesn't match", type: "error", isLoading: false});
                    setTimeout(() => {window.location.reload();}, 2000)
                } else {
                    localStorage.setItem('id', result.data.id)
                    localStorage.setItem('name', result.data.name)
                    localStorage.setItem('email', result.data.email)
                    localStorage.setItem('type', result.data.type)
                    toast.update(id, {render: "Welcome " + result.data.name +"!🥳", type: "success", isLoading: false});
                    setTimeout(() => {setLogedin(true);}, 3000)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => getToken(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    if (logedin) {
        return < Navigate to="/" />
    } if(reg) {
        return < Navigate to="/register" />
    }
    return (
        <div className="cover">
           
            <h1>Login</h1>
            <input value={email} type="text" placeholder="username" onChange={(e) => setEmail(e.target.value)}/>
            <input value={password} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>

            <div className="login-btn" onClick={popup}>Login</div>

            <div className="alt-login">
                <div className="google" onClick={() => login()}></div>
                <div className="login-btn-reg" onClick={() => setReg(true)} >Register</div>
            </div>
            
        </div>
    )
}

export default LoginForm