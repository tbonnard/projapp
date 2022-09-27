import React from 'react'
import { useDispatch } from 'react-redux'

import { projectSelect, projectUnselect } from '../../reducers/projectSelectedReducer'
import { unselectNote } from  '../../reducers/selectNoteReducer'
import { noteSavedReducer } from '../../reducers/selectNoteSavedReducer'

const ProjectsListItem = ({project, projectIdSelected}) => {

    const dispatch = useDispatch()

    const handleClick = (e) => {
        dispatch(noteSavedReducer())
        e.preventDefault()
        if (projectIdSelected) {
            if (projectIdSelected===project.id) {
                dispatch(projectUnselect())
            } else {
                dispatch(projectSelect(project.id))
            }
        } else {
            dispatch(projectSelect(project.id))
        }
        dispatch(unselectNote())
    }

    return (
        <div>
            {projectIdSelected === project.id ? 
            <div className='projectListName'>
                <button className='buttonFilter buttonSelected' onClick={handleClick}>{project.projectName}</button>
            </div>
            :
            <div className='projectListName'>
                <button className='buttonFilter buttonUnselected' onClick={handleClick}>{project.projectName}</button>
            </div>    
            }
        </div>

    )
}

export default ProjectsListItem