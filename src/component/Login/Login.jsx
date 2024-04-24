import React, { useState } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie';

function Login({setIsAuth}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const cookies = new Cookies()
    const handleLogin = () => {
        Axios.post('http://localhost:3001/login', {username,password}).then(res => {
            const {token, userID, firstName, lastName, username} = res.data;
            cookies.set('token', token);
            cookies.set('userID', userID);
            cookies.set('username', username);
            cookies.set('firstName', firstName);
            cookies.set('lastName', lastName);
            setIsAuth(true)
           })
    }
    return (
        <div className='login'>
            <label> Login</label>
            <input
                placeholder='Username'
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
            />
            <input
                type='password'
                placeholder='Password'
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
