import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { changeLimitDaily } from '../../reducers/limitDailyReducer'
import { createDaily } from '../../reducers/dailyReducer'
import { changeMenuViewRight } from "../../reducers/menuExpandCollapseReducer";

import collapseIcon from '../../files/collapse.svg';
import expandIcon from '../../files/expand.svg';
import loadMoreIcon from '../../files/loadMore.svg';
import addIcon from '../../files/addIcon.svg';

const DailyRightColumn = () => {
    const dispatch = useDispatch()

    const limitDaily = useSelector(state => state.limitDaily)
    const menuView = useSelector(state => state.menuExpandCollapse)

    const handleMoreDailys = () => {
        dispatch(changeLimitDaily(limitDaily)) 
        setTimeout('window.scrollTo(0, document.body.scrollHeight)', 300)
    }

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {description:''}
        dispatch(createDaily(itemObject, limitDaily))
        window.scrollTo(0, 0);
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


    return (
        <div className="rightColumnInit rightColumn">

            {menuView.right ? 
            <div className='rightColumnItems'>
                <div className='sectionRighColumn'><span className='sectionRighColumnTitle'>ACTIONS</span>
                    <div className='subSectionRighColumn'>
                        <div className='iconsButtonsSection'>
                            {/* <DailyCreateForm limitDaily={limitDaily}/> */}
                            {/* <button className='buttonLight' onClick={handleMoreDailys}>see more</button> */}
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleMoreDailys} title='Load more item'><img className='icons' src={loadMoreIcon} title='Load more item' alt='Load more item' /></button>
                                <span className='iconButtonSectionActionText'>Load more</span>
                            </div>
                            <div className='iconButtonSectionAction'>
                                <button className='buttonIcons' onClick={handleCreateItem} title='Create a new daily'><img className='icons' src={addIcon} title='Create a new daily'  alt='Create a new daily' /></button>
                                <span className='iconButtonSectionActionText'>Create daily</span>
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
            <button className='buttonIcons' onClick={handleMoreDailys} title='Load more item'><img className='icons' src={loadMoreIcon} title='Load more item' alt='Load more item' /></button>
            </div>
            <div>
            <button className='buttonIcons' onClick={handleCreateItem} title='Create a new daily'><img className='icons' src={addIcon} title='Create a new daily'  alt='Create a new daily' /></button>
            </div>

            <div className="expandIconRight" onClick={handleClickMenu}>
                <img id='' className='iconsMenuWhite' src={expandIcon} title='Expand menu' alt='Expand menu' />
            </div> 
        </>
        }

        </div>  
    )
}

export default DailyRightColumn