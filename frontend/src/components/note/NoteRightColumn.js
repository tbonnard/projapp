import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"

import ProjectsList from '../project/ProjectsList'
import FilterMeetingDate from './FilterMeetingDate'
import Search from './Search'
import FilterMeetingDateMobile from "./FilterMeetingDateMobile";

import { deactivateNote, createNote, getUserNoteDateCreated, getUserNote } from '../../reducers/NotesReducer'
import { unselectNote } from '../../reducers/selectNoteReducer'
import { createItemToDo } from '../../reducers/itemsToDoReducer'
import { changeMenuViewRight } from "../../reducers/menuExpandCollapseReducer";
import { noteSavedReducer } from '../../reducers/selectNoteSavedReducer'
import { selectNoteIndicator } from '../../reducers/selectNoteIndicatorReducer'

import collapseIcon from '../../files/collapse.svg';
import expandIcon from '../../files/expand.svg';
import deleteIcon from '../../files/delete.svg';
import transferToDo from '../../files/transferToDo.svg';
import addIcon from '../../files/addIcon.svg';
import settingsIcon from '../../files/settings.svg'
import sortIcon from '../../files/sort.svg'


const NoteRightColumn = () => {
    const dispatch = useDispatch()

    const history = useHistory();

    const projectIdSelected = useSelector(state => state.projectSelected)
    const projects = useSelector(state => state.projects)
    const selectedNote = useSelector(state => state.selectedNote)
    const menuView = useSelector(state => state.menuExpandCollapse)

    const [sortFilterCreated,setSortFilter] = useState(false)


    const handleDone = () => {
        const itemObject = {id:selectedNote.id}
        dispatch(deactivateNote(itemObject))
        dispatch(unselectNote())
        dispatch(noteSavedReducer())
        dispatch(selectNoteIndicator())
    }

    const handleCreateTodo = () => {
        const cutDescription = selectedNote.description.replace(/<[^>]*>?/gm, '').slice(0,30)
        
        const itemObject = {title:cutDescription, project:selectedNote.project, relatedNote:selectedNote.id}
        dispatch(createItemToDo(itemObject))
        let path = `/app/todos`; 
        history.push(path);
        dispatch(noteSavedReducer())
    }


    const handleCreateNote = (e) => {
        e.preventDefault()
        const itemObject = {title: '', description:'', project:projectIdSelected}
        dispatch(createNote(itemObject))
    }


    useEffect(() => {
        let rightSection = document.querySelector('.rightColumnInit')

        if (!menuView.right) {
            rightSection.className = 'rightColumnInit rightColumnAnim'           
        }  else {
            rightSection.className = 'rightColumnInit rightColumn'
        }

      }, [dispatch, menuView])

      const handleClickMenu = () => {
        dispatch(changeMenuViewRight(menuView.left, menuView.right))
        dispatch(noteSavedReducer())
      }

      const handleSort = () => {
        if (sortFilterCreated) {
            setSortFilter(false)
            dispatch(getUserNote())
        } else {
            dispatch(getUserNoteDateCreated())
            setSortFilter(true)
        }
      }


    return (
        <div className="rightColumnInit rightColumn">

           {menuView.right ? 
            <div className='rightColumnItems'>
                <div className='sectionRighColumn'><span className='sectionRighColumnTitle'>ACTIONS</span>
                    <div className='subSectionRighColumn'>
                        <div className='iconsButtonsSection'>
                            <FilterMeetingDate />

                            {sortFilterCreated ? 
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons buttonIconsSelected' onClick={handleSort} title='Sort by modified date'><img className='icons' src={sortIcon} title='Sort by modified date' alt='Sort by modified date' /></button>
                                <span className='iconButtonSectionActionText'>Sort by modification</span>
                            </div>
                            :
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleSort} title='Sort by created date'><img className='icons' src={sortIcon} title='Sort by created date' alt='Sort by created date' /></button>
                                <span className='iconButtonSectionActionText'>Sort by creation</span>
                            </div>
                            }

                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleCreateTodo} title='Create a todo from the note'><img className='icons' src={transferToDo} title='Create a todo from the note' alt='Create a todo from the note' /></button>
                                <span className='iconButtonSectionActionText'>Create todo</span>
                            </div>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleDone} title='Delete the item'><img className='icons' src={deleteIcon} title='Delete the item' alt='Delete the item' /></button>
                                <span className='iconButtonSectionActionText'>Delete</span>
                            </div>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleCreateNote} title='Create a new note'><img className='icons' src={addIcon} title='Create a new note'  alt='Create a new note' /></button>
                                <span className='iconButtonSectionActionText'>Create note</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='sectionRighColumn'><span className='sectionRighColumnTitle'>SEARCH</span>
                    <div className='subSectionRighColumn'>
                        <Search />
                    </div>
                </div>

                <div className='sectionRighColumn'>
                    <div className='sectionRighColumnFilterTop'>
                        <span className='sectionRighColumnTitle'>TAGS</span>
                        <Link className='navLink' to="/setup"><img className='filterSettingsIcon' src={settingsIcon} alt='Update tags' title='Update tags'/></Link>
                    </div>
                    <div className='subSectionRighColumn'>
                        <ProjectsList projects={projects} />
                    </div>
                </div>
             

                <div className="expandIconRight" onClick={handleClickMenu}>
                        <img id='' className='iconsMenuWhite' src={collapseIcon} title='Collapse menu' alt='Collapse menu' />
                </div> 

            </div>

            :
            <>
            <div>
                <FilterMeetingDateMobile />
            </div>

            {sortFilterCreated ? 
            <div>
                <button className='buttonIcons buttonIconsSelected' onClick={handleSort} title='Sort by modified date'><img className='icons' src={sortIcon} title='Sort by modified date' alt='Sort by modified date' /></button>
            </div>
            :
            <div>
                <button className='buttonIcons' onClick={handleSort} title='Sort by created date'><img className='icons' src={sortIcon} title='Sort by created date' alt='Sort by created date' /></button>
            </div>
            }
            <div>
                <button className='buttonIcons' onClick={handleCreateTodo} title='Create a todo from the note'><img className='icons' src={transferToDo} title='Create a todo from the note' alt='Create a todo' /></button>
            </div>
            <div>
                <button className='buttonIcons' onClick={handleDone} title='Delete the item'><img className='icons' src={deleteIcon} title='Delete the item' alt='Delete the item' /></button>
            </div>
            <div>
                <button className='buttonIcons' onClick={handleCreateNote} title='Create a new note'><img className='icons' src={addIcon} title='Create a new note'  alt='Create a new note' /></button>
            </div>

            <div className="expandIconRight" onClick={handleClickMenu}>
                <img id='' className='iconsMenuWhite' src={expandIcon} title='Expand menu' alt='Expand menu' />
            </div> 
            </>
                        }
        </div>  
    )
}

export default NoteRightColumn