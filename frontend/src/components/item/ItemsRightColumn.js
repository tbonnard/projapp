import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import { createUserCategory, deactivateCategory } from '../../reducers/categoriesReducer'
import { createNote } from '../../reducers/NotesReducer'
import { createItemCategory } from '../../reducers/itemsCategoriesReducer';
import { changeMenuViewRight } from "../../reducers/menuExpandCollapseReducer";

import collapseIcon from '../../files/collapse.svg';
import expandIcon from '../../files/expand.svg';
import doneIcon from '../../files/done.svg';
import addIcon from '../../files/addIcon.svg';
import transferNote from '../../files/transferNote.svg';
import addItem from '../../files/addItem.svg';



const ItemsRightColumn = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const selectedDiscItem = useSelector(state => state.selectedDiscussionItem)
    const menuView = useSelector(state => state.menuExpandCollapse)

    const handleCreateCategory = (e) => {
        e.preventDefault()
        const itemObject = {description:''}
        dispatch(createUserCategory(itemObject))
    }

    const handleDone = () => {
        const itemObject = {id:selectedDiscItem.id}
        dispatch(deactivateCategory(itemObject, selectedDiscItem.id))
    }

    const handleNewNote = (e) => {
        const startTitle = 'Note from discussion:'
        const titleForNewNote = startTitle.concat(' ', selectedDiscItem.description)
        const itemObject = {meetingNote:true, category:selectedDiscItem.id, title: '', description:titleForNewNote}
        dispatch(createNote(itemObject))
        let path = `/app/notes`; 
        history.push(path);
    }

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {description:'', category:selectedDiscItem.id}
        dispatch(createItemCategory(itemObject,selectedDiscItem))
    }

    const handleClickMenu = () => {
        dispatch(changeMenuViewRight(menuView.left, menuView.right))
      }


    useEffect(() => {
        let rightSection = document.querySelector('.rightColumnInit')

        if (!menuView.right) {
            rightSection.className = 'rightColumnInit rightColumnAnim'           
        }  else {
            rightSection.className = 'rightColumnInit rightColumn'
        }

      }, [dispatch, menuView])

    if (!selectedDiscItem) {
        return <div className="rightColumnInit"></div>
    }

    return (
        <div className="rightColumnInit">
            
            {menuView.right ? 
            <div className='rightColumnItems'>
                <div className='sectionRighColumn'><span className='sectionRighColumnTitle'>ACTIONS</span>
                    <div className='subSectionRighColumn'>
                        <div className='iconsButtonsSection'>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleCreateItem} title={`Add a new item you want to discuss regarding the ${selectedDiscItem.description}`} ><img className='icons' src={addItem} title={`Add a new item you want to discuss regarding the ${selectedDiscItem.description}`}  alt={`Add a new item you want to discuss regarding the ${selectedDiscItem.description}`} /></button>
                                <span className='iconButtonSectionActionText'>Add an item</span>
                            </div>
                            {!selectedDiscItem.defaultAdmin && 
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleDone} title={`Mark ${selectedDiscItem.description} as Done`} ><img className='icons' src={doneIcon} title={`Mark ${selectedDiscItem.description} as Done`}   alt={`Mark ${selectedDiscItem.description} as Done`} /></button>
                                <span className='iconButtonSectionActionText'>Mark as Done</span>
                            </div>
                            }
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleNewNote} title='Create a note from that item' ><img className='icons' src={transferNote} title='Create a note from that item'  alt='Create a note from that item' /></button>
                                <span className='iconButtonSectionActionText'>Create note</span>
                            </div>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleCreateCategory} title='Create a new discussion item' ><img className='icons' src={addIcon} title='Create a new discussion item'  alt='Create a new discussion item' /></button>
                                <span className='iconButtonSectionActionText'>Create meeting</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="expandIconRight" onClick={handleClickMenu}>
                        <img id='' className='iconsMenuWhite' src={collapseIcon} title='Collapse menu' alt='Collapse menu' />
                </div> 
            </div>
            :
            <>
                <div>
                <button className='buttonIcons' onClick={handleCreateItem} title={`Add a new item you want to discuss regarding the ${selectedDiscItem.description}`} ><img className='icons' src={addItem} title={`Add a new item you want to discuss regarding the ${selectedDiscItem.description}`}  alt={`Add a new item you want to discuss regarding the ${selectedDiscItem.description}`} /></button>
                </div>
                {!selectedDiscItem.defaultAdmin && 
                <div>
                <button className='buttonIcons' onClick={handleDone} title={`Mark ${selectedDiscItem.description} as Done`} ><img className='icons' src={doneIcon} title={`Mark ${selectedDiscItem.description} as Done`}   alt={`Mark ${selectedDiscItem.description} as Done`} /></button>
                </div>
                    }
                <div>
                <button className='buttonIcons' onClick={handleNewNote} title='Create a note from that item' ><img className='icons' src={transferNote} title='Create a note from that item'  alt='Create a note from that item' /></button>
                </div>
                <div>
                <button className='buttonIcons' onClick={handleCreateCategory} title='Create a new discussion item' ><img className='icons' src={addIcon} title='Create a new discussion item'  alt='Create a new discussion item' /></button>
                </div>

                <div className="expandIconRight" onClick={handleClickMenu}>
                    <img id='' className='iconsMenuWhite' src={expandIcon} title='Expand menu' alt='Expand menu' />
                </div> 
            </>
            }

        </div>  
    )
}

export default ItemsRightColumn