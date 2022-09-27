import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { createItemCategory } from '../../reducers/itemsCategoriesReducer'
import { hideAddItem } from '../../reducers/addItemReducer'

import addItemIcon from '../../files/addItemIcon.svg';


const ItemCreateForm = ({category}) => {

    const dispatch = useDispatch()

    const [description, setDescription] = useState('')


    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {description:description, category:category.id}
        dispatch(hideAddItem())
        dispatch(createItemCategory(itemObject,category))
        setDescription('')
    }

    const handleClickRemove = (e) => {
        e.preventDefault()
        dispatch(hideAddItem())
        setDescription('')
    }


    return (
        <form onSubmit={handleCreateItem} className='createProject itemCreateForm'>
        <input type="text" className='inputCreateItemCategory' placeholder={`+ new item you want to discuss regarding the ${category.description}`} value={description} onChange={(e) => setDescription(e.target.value)} />                 
        <img className='iconCreateCategoryFilter' src={addItemIcon} alt='Create a new category' title={`Create a new item`} onClick={handleCreateItem}/>
     </form>
    )

}

export default ItemCreateForm