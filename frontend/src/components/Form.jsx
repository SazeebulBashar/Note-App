import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFREASH_TOKEN } from '../constants';
import api from '../api';
import "../styles/Form.css";

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
            const res = await api.post(route, {userName, password});
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFREASH_TOKEN, res.data.refresh);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }

    }

  return (
    <form className='form-container' action="" method="post"  onSubmit={handleSubmit}>
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

        <button className='form-button' type="submit">{name}</button>

    </form>
  )
}
