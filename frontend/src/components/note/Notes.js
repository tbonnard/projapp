import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserNote } from '../../reducers/NotesReducer'
import { getUserProjects } from '../../reducers/projectReducer'
import { projectUnselect } from '../../reducers/projectSelectedReducer'
import { collapseMenuView } from '../../reducers/menuExpandCollapseReducer'
import { noteSavedReducer } from '../../reducers/selectNoteSavedReducer'

import NotesList from './NotesList'
import NoteDescription from './NoteDescription'


const Notes = ({menuView}) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const notes = useSelector(state => state.notes)
    const projects = useSelector(state => state.projects)
    const projectIdSelected = useSelector(state => state.projectSelected)

    useEffect(() => {
        dispatch(collapseMenuView(menuView.right))
        dispatch(getUserProjects())
        dispatch(getUserNote())
        dispatch(projectUnselect())
        dispatch(noteSavedReducer())
      }, [dispatch,menuView.right])


    if (!user ) {
        return null
    }
    
    return (
        <div className='containerGlobal'>

            <div className='noteGlobalStructure'>

                <div className='sectionRighColumn'>
                        <span className='sectionRighColumnTitle'>NOTES</span>
                        <div className='subSectionRighColumn'>
                            {projectIdSelected===null ? 
                            <NotesList items={notes} />
                            :
                            <NotesList items={notes.filter(item => item.project === projectIdSelected)}/>
                            }
                        </div>
                    </div>

                <NoteDescription projects={projects} items={notes} />
            </div>
         </div>
    )
}

export default Notes