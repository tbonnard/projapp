import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserItemsOneCategory } from '../../reducers/itemsCategoriesReducer';

import {selectDiscItem} from '../../reducers/selectDiscussionItemReducer'

const ItemCategorySmall = ({category}) => {
    
    const dispatch = useDispatch()

    const selectedDiscItem = useSelector(state => state.selectedDiscussionItem)

    const handleClick = () => {
        dispatch(selectDiscItem(category))
        dispatch(getUserItemsOneCategory(category.id))
    }

    if (!category){
        return null
    } else if (!selectedDiscItem) {
        return (
            <div className='categoryRightBox' onClick={handleClick}>
                <p>{category.description}</p>
            </div>   
        )
    } else {
        return (
            <>
            {selectedDiscItem.id === category.id ? 
                <div className='categoryRightBox categoryRightBoxSelected' onClick={handleClick}>
                    <p>{category.description}</p>
                </div>   
            :
            <div className='categoryRightBox' onClick={handleClick}>
                    <p>{category.description}</p>
                </div>   
            }
            </>
         
        )
    }

}

export default ItemCategorySmall