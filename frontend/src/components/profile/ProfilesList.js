import React  from 'react'
import {  useSelector } from 'react-redux'

import Profile from './Profile'

const ProfilesList = () => {

    const profiles = useSelector(state => state.profiles)
    const currentProfile = useSelector(state => state.profileCurrent)

    if (!profiles) {
        return null
    }
    
    return (
        <>
        {profiles.map(prof => <Profile key={prof.id} item={prof} currentProfile={currentProfile}/>)}
        </>
    )
}

export default ProfilesList