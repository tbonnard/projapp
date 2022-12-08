import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { createItemProject } from '../../reducers/itemsProjectsReducer'
import {archiveDoneItemsProjects} from '../../reducers/itemsProjectsReducer'
import { changeMenuViewRight } from "../../reducers/menuExpandCollapseReducer";

import collapseIcon from '../../files/collapse.svg';
import expandIcon from '../../files/expand.svg';
import archiveElementsIcon from '../../files/done.svg'
import ProjectsList from './ProjectsList'
import addIcon from '../../files/addIcon.svg';
import settingsIcon from '../../files/settings.svg'


const ProjectStatusRightColumn = () => {
    const dispatch = useDispatch()

    const projects = useSelector(state => state.projects)
    const projectIdSelected = useSelector(state => state.projectSelected)
    const menuView = useSelector(state => state.menuExpandCollapse)

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {title: '', description:'', project:projectIdSelected}
        dispatch(createItemProject(itemObject))
        window.scrollTo(0, document.body.scrollHeight);
    }

    const handleArchiveItems = () => {
        dispatch(archiveDoneItemsProjects())
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
        <div className="rightColumnInit">

            {menuView.right ? 
            <div className='rightColumnItems'>
                <div className='sectionRighColumn'><span className='sectionRighColumnTitle'>ACTIONS</span>
                    <div className='subSectionRighColumn'>
                        <div className='iconsButtonsSection'>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleArchiveItems} title='Archive done items'><img className='icons' src={archiveElementsIcon} alt='Archive done items' title='Archive done items' onClick={handleArchiveItems}/></button>
                                <span className='iconButtonSectionActionText'>Archive Done</span>
                            </div>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleCreateItem} title='Create a new item'><img className='icons' src={addIcon} title='Create a new item'  alt='Create a new item' /></button>
                                <span className='iconButtonSectionActionText'>Create item</span>
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
            <button className='buttonIcons' onClick={handleArchiveItems} title='Archive done items'><img className='icons' src={archiveElementsIcon} alt='Archive done items' title='Archive done items' onClick={handleArchiveItems}/></button>
            </div>
            <div>
            <button className='buttonIcons' onClick={handleCreateItem} title='Create a new item'><img className='icons' src={addIcon} title='Create a new item'  alt='Create a new item' /></button>
            </div>

            <div className="expandIconRight" onClick={handleClickMenu}>
                <img id='' className='iconsMenuWhite' src={expandIcon} title='Expand menu' alt='Expand menu' />
            </div> 
        </>
            }

        </div>  
    )
}

export default ProjectStatusRightColumn