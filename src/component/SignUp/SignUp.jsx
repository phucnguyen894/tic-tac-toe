import React, { useState } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie'

function SignUp({setIsAuth}) {
   const cookies = new Cookies()
   const [user, setUser] = useState(null)
   const handleSignUp = () => {
      Axios.post('http://localhost:3001/signup', user).then(res => {
         const { token, userID, firstName, lastName, username, hashedPassword } = res.data;
         cookies.set('token', token);
         cookies.set('userID', userID);
         cookies.set('firstName', firstName);
         cookies.set('lastName', lastName);
         cookies.set('username', username);
         cookies.set('hashedPassword', hashedPassword);
         setIsAuth(true)
      })
   }

   return (
      <div className='signUp'>
         <label> Sign Up</label>
         <input
            placeholder='First Name'
            onChange={(e) => {
               setUser({ ...user, firstName: e.target.value })
            }}
         />
         <input
            placeholder='Last Name'
            onChange={(e) => {
               setUser({ ...user, lastName: e.target.value })
            }}
         />
         <input
            placeholder='Username'
            onChange={(e) => {
               setUser({ ...user, username: e.target.value })
            }}
         />
         <input
            type='password'
            placeholder='Password'
            onChange={(e) => {
               setUser({ ...user, password: e.target.value })
            }}
         />
         <button onClick={handleSignUp}>Sign Up</button>
      </div>
   )
}

export default SignUp
