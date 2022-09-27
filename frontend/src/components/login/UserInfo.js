import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUser } from '../../reducers/userReducer'
import { getUserProfiles } from '../../reducers/profilesReducer'

import Profiles from '../profile/Profiles'


const UserInfo = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUserProfiles())
      }, [dispatch])
      
    const handleLogout= ()=>{
        dispatch(logoutUser())
    }

    if (!user) {
        return null
    }
    
    return (
        <div className='containerGlobal'>
            <h2>Hi {user.email}!</h2>
            <button onClick={handleLogout}>Logout</button>
            <Profiles />
        </div>
    )
}

export default UserInfo