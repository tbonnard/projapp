import React  from 'react'

import ProfileCreateForm from './ProfileCreateForm'
import ProfilesList from './ProfilesList'

const Profiles = () => {

    
    return (
        <div className='profileGlobal'>
            <h2>Profiles</h2>
            <ProfilesList />
            <ProfileCreateForm />
        </div>
    )
}

export default Profiles