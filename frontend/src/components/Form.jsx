import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';
import "../styles/Form.css";
import LoadingIndicator from './LoadingIndicator';

export default function Form({route, method}) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";


    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username: userName, password: password});
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            }
            else{
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }

    }

  return (
    <form className='form-container' onSubmit={handleSubmit}>
    <h1>{name}</h1>
    <input 
        className='form-input'
        type="text"
        name="username"
        placeholder="Enter username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
     />
     <input 
        className='form-input'
        type="password" 
        name="password" 
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        
        {loading && <LoadingIndicator/>}

        <button className='form-button' type="submit" >{name}</button>

    </form>
  )
}
