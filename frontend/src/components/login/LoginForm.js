import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import { userLogin } from '../../reducers/userReducer'

const LoginForm = () => {
    
    const dispatch = useDispatch()

    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({email, password}))
        setUsername('')
        setPassword('')

    }

    return (
        <div className='containerGlobal'>
            <h2>Login to your account</h2>
            <form onSubmit={handleLoginSubmit}>
                <input type="email" placeholder='your email' value={email} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className=''>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <p>Don't have an account?
            <Link className='' to="/signup"> create an account</Link></p>
        </div>
    )

}

export default LoginForm