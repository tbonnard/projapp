import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import changeProfile from '../../files/change_profile.png'
import selectedIcon from '../../files/selected.png'

import { updateProfile } from '../../reducers/profilesReducer'
import { changeCurrentProfile } from '../../reducers/profileCurrentReducer'


const Profile = ({item, currentProfile}) => {
    const dispatch = useDispatch()

    const history = useHistory();

    const [title, setTitle] = useState(item.title)

    const handleChange = () => {
        const itemObject = {id:item.id}
        dispatch(changeCurrentProfile(itemObject))
        let path = `/app/todos`; 
        history.push(path);
    }

    const handleSaveAutoDesc = (e) => {
        setTitle(e.target.value)
        const itemObject = {id:item.id, title:e.target.value}
        setTimeout(() => {
        dispatch(updateProfile(itemObject))
          }, 500);
    }
    
    if ( !currentProfile ) {
        return null
    }

    return (
        <div className='item itemProfile'>
            {currentProfile.id !== item.id ?
            <div>
                <img className='iconNotSelectedProfile' src={changeProfile} alt='Change profile' title={`Change profile`} onClick={handleChange}/>
            </div>
            :
            <div>
                <img className='selectedIcon' src={selectedIcon} alt='Selected profile' title={`Selected profile`}/>
            </div>
            }
            <div className='lineItem'>
                <input type="text" placeholder="title" value={title} onChange={(e) => handleSaveAutoDesc(e)} />   
            </div>
        </div>
    )
}

export default Profile

