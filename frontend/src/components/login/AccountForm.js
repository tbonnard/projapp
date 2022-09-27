import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import { createAccount } from '../../reducers/userReducer'

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
        <div className='containerGlobal'>
            <h2>Create an account</h2>
            <form onSubmit={handleCreateAccount}>
                <input type="email" placeholder='your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='your password (6 characters min)' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder='confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type='submit'>Create</button>
            </form>
            <p>Already have an account?
            <Link className='' to="/signin"> login to your account</Link></p>
        </div>
    )
}

export default AccountForm