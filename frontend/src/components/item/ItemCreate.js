import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import plusIcon from '../../files/plus.png'
import arrowRight from '../../files/arrow-right.png'

import { displayAddItem } from '../../reducers/addItemReducer'

const ItemCreate = ({category}) => {

    const dispatch = useDispatch()

    const addedItem = useSelector(state => state.addItem)


    const handleClickAdd = (e) => {
        e.preventDefault()
        dispatch(displayAddItem(category))
    }

    if (addedItem) {
        if (addedItem.id === category.id) {
            return (
                <div>
                    <img className='plusIconArrow' src={arrowRight} alt='Add' title={`Add a new item for ${category.description}`}/>
                </div>
            )
        } else {
            return (
                <div>
                    <img className='plusIcon' src={plusIcon} alt='Add' title={`Add a new item for ${category.description}`} onClick={handleClickAdd}/>
                </div>
            )
        } } 
        
        else {
            return (
                <div>
                    <img className='plusIcon' src={plusIcon} alt='Add' title={`Add a new item for ${category.description}`} onClick={handleClickAdd}/>
                </div>
            )
        }


}

export default ItemCreate