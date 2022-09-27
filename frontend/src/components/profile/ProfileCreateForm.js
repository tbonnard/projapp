import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { createProfile } from '../../reducers/profilesReducer'

const ProfileCreateForm = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {title: title}
        dispatch(createProfile(itemObject))
        setTitle('')
    }
    
    return (
        <div className='createProject'>
            <form onSubmit={handleCreateItem} className='createProject'>
                <input autoFocus={true} type="text" placeholder="add a new profile" value={title} onChange={(e) => setTitle(e.target.value)} /> 
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default ProfileCreateForm