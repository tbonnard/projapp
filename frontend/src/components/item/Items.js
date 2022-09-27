import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserCategories } from '../../reducers/categoriesReducer'
import { defaultSelectedDiscItem } from '../../reducers/selectDiscussionItemReducer'
import { collapseMenuView } from '../../reducers/menuExpandCollapseReducer'

import ItemDescription from './ItemDescription'
import ItemsSmallList from './ItemsSmallList'


const Items = ({menuView}) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(collapseMenuView(menuView.right))
        dispatch(getUserCategories())
        dispatch(defaultSelectedDiscItem())
      }, [dispatch, menuView.right])


    if (!user) {
        return null
    }

    return (
        <div className='containerGlobal'>

            <div className='noteGlobalStructure'>

                <div className='subSectionRighColumn'>
                    <ItemsSmallList />
                </div>
                
                <ItemDescription />

            </div>
            
         </div>
    )
}

export default Items