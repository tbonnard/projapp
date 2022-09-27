import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import {deactivateItemCategory, updateItemCategory} from '../../reducers/itemsCategoriesReducer'

const Item = ({item}) => {
    const dispatch = useDispatch()

    const [description, setDescription] = useState(item.description)

    const handleDone = (e) => {
        // console.log(e.target.checked)
        const itemObject = {id:item.id}
        dispatch(deactivateItemCategory(itemObject, item.category))
    }

    const handleSaveAutoDesc = (e) => {
        setDescription(e.target.value)
        const itemObject = {id:item.id, description:e.target.value}
        setTimeout(() => {
        dispatch(updateItemCategory(itemObject, item.category))
          }, 500);
    }

    return (
        <div className='item'>
            <div>
                <input type="checkbox" className='checkboxClass' title='Mark as Done and archive' onClick={(e) => handleDone(e)} />
            </div>
            <div className='lineItem'>
                <input type="text" autoFocus placeholder="title" value={description} onChange={handleSaveAutoDesc} />   
            </div>
        </div>
    )
}

export default Item