import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import ProjectsList from '../project/ProjectsList'
import { changeKanbanView } from '../../reducers/todoKanbanReducer'
import { createItemToDo } from '../../reducers/itemsToDoReducer'
import {archiveDoneTodos} from '../../reducers/itemsToDoReducer'
import { changeMenuViewRight } from "../../reducers/menuExpandCollapseReducer";

import collapseIcon from '../../files/collapse.svg';
import expandIcon from '../../files/expand.svg';
import kanbanIcon from '../../files/kanban.svg';
import ListViewIcon from '../../files/ListViewIcon.svg';
import addIcon from '../../files/addIcon.svg';
import archiveElementsIcon from '../../files/done.svg'
import settingsIcon from '../../files/settings.svg'

const ToDoRightColumn = () => {
    const dispatch = useDispatch()

    const projects = useSelector(state => state.projects)
    const todosViewKanban=useSelector(state=>state.kanbanView)
    const projectIdSelected = useSelector(state => state.projectSelected)
    const menuView = useSelector(state => state.menuExpandCollapse)

    const handleKaban = () => {
        dispatch(changeKanbanView(todosViewKanban))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {title:'', project:projectIdSelected}
        dispatch(createItemToDo(itemObject))
        setTimeout('window.scrollTo(0, document.body.scrollHeight)', 300)

    }

    const handleArchiveItems = () => {
        dispatch(archiveDoneTodos())
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
      }

    return (
        <div className="rightColumnInit rightColumn">

        {menuView.right ? 
                <div className='rightColumnItems'>
                    <div className='sectionRighColumn'><span className='sectionRighColumnTitle'>ACTIONS</span>
                        <div className='subSectionRighColumn'>
                            <div className='iconsButtonsSection'>
                                <div className='iconButtonSectionAction'>
                                    <button className='buttonIcons' onClick={handleKaban} title='Change view (List / Kanban)'>{todosViewKanban ? <img className='icons' src={ListViewIcon} title='View as List' alt='View as List' /> : <img className='icons' src={kanbanIcon} title='View as kanban' alt='View as kanban' /> }</button>
                                    {todosViewKanban ?  <span className='iconButtonSectionActionText'>View as list</span> : <span className='iconButtonSectionActionText'>View as kanban</span>}
                                </div>
                                <div className='iconButtonSectionAction'>
                                    <button className='buttonIcons' onClick={handleArchiveItems} title='Archive done items'><img className='icons' src={archiveElementsIcon} alt='Archive done items' title='Archive done items' onClick={handleArchiveItems}/></button>
                                    <span className='iconButtonSectionActionText'>Archive Done</span>
                                </div>
                                <div className='iconButtonSectionAction'>
                                    <button className='buttonIcons' onClick={handleCreateItem} title='Create a new to do' ><img className='icons' src={addIcon} title='Create a new to do'  alt='Create a new to do' /></button>
                                    <span className='iconButtonSectionActionText'>Create to do</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sectionRighColumn'>
                        <div className='sectionRighColumnFilterTop'>
                            <span className='sectionRighColumnTitle'>TAGS</span>
                            <Link className='navLink' to="/app/setup"><img className='filterSettingsIcon' src={settingsIcon} alt='Update tags' title='Update tags'/></Link>
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
                    <button className='buttonIcons' onClick={handleKaban} title='Change view (List / Kanban)'>{todosViewKanban ? <img className='icons' src={ListViewIcon} title='List View' alt='List View' /> : <img className='icons' src={kanbanIcon} title='Kanban View' alt='Kanban View' /> }</button>
                </div>
                <div>
                    <button className='buttonIcons' onClick={handleArchiveItems} title='Archive done items'><img className='icons' src={archiveElementsIcon} alt='Archive done items' title='Archive done items' onClick={handleArchiveItems}/></button>
                </div>
                <div>
                    <button className='buttonIcons' onClick={handleCreateItem} title='Create a new to do' ><img className='icons' src={addIcon} title='Create a new to do'  alt='Create a new to do' /></button>
                </div>

                <div className="expandIconRight" onClick={handleClickMenu}>
                    <img id='' className='iconsMenuWhite' src={expandIcon} title='Expand menu' alt='Expand menu' />
                </div> 
            </>
        }
    </div>
    )
}

export default ToDoRightColumn