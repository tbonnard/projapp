import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import { createAccount } from '../../reducers/userReducer'

import Notification from '../Notification'

const AccountForm = () => {

    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleCreateAccount = (e) => {
        e.preventDefault()
        const accountObject = {password:password, confirmPassword:confirmPassword, email:email}
        dispatch(createAccount(accountObject))
        setPassword('')
        setConfirmPassword('')
        setEmail('')
    }


    return (
        <div className='login_register'>
            <div className='login_registerForm'>
                <h2>Create an account</h2>
                <form onSubmit={handleCreateAccount}>
                    <input type="email" placeholder='your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='your password (6 characters min)' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" placeholder='confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <div>
                        <button className='login_registerFormButton' type='submit'>Create</button>
                    </div>
                </form>
                <p>Already have an account?
                <Link className='linkConnect' to="/signin"> Login to your account.</Link></p>
            </div>
            <Notification />
        </div>
    )
}

export default AccountForm