import React, { useState } from "react";
import { useDispatch } from 'react-redux'

import { createProject } from '../../reducers/projectReducer'
import { unCreateProjectCheck } from '../../reducers/projectCreateReducer'

import addItemIcon from '../../files/addItemIcon.svg';

const ProjectCreateForm = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {projectName: title}
        if (title.length > 0) {
            dispatch(createProject(itemObject))
            setTitle('')
            dispatch(unCreateProjectCheck())
        }
    }

    return (
 
            <form onSubmit={handleCreateItem} className='createProject'>
                <input type="text" id='inputIconCreateCategoryFilterId' className='inputCreateCategoryFilter' placeholder="+ new tag" value={title} onChange={(e) => setTitle(e.target.value)} />                 
                {title.trim().length >0 && 
                  <img id='iconCreateCategoryFilterId' className='iconCreateCategoryFilter' src={addItemIcon} alt='Create a new tag' title={`Create a new tag`} onClick={handleCreateItem}/>
                }
             </form>
 

    )
}

export default ProjectCreateForm