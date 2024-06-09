import { Navigate } from 'react-router-dom';
import {jwtdecode} from 'jwt-decode';
import api from '../api';
import { REFREASH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

function ProtectedRoutes({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(()=>{
        auth().catch(()=> {setIsAuthorized(false)});
    },[]);
    
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFREASH_TOKEN);
        try {
            const res = api.post("api/token/refresh/", {refresh: refreshToken});
            if((await res).status === 200){
                localStorage.setItem(ACCESS_TOKEN, (await res).data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        } catch (error) {
            setIsAuthorized(false);
            console.log(error);

            
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            setIsAuthorized(false);
            return;
        }
        const decodedToken = jwtdecode(token);
        const tokenExpiration = decodedToken.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }

    }

    if (isAuthorized === null) {
        return <div>Loading.....</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />

}

export default ProtectedRoutes;