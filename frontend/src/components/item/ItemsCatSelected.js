import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { updateItemDescriptionUserCategory } from '../../reducers/categoriesReducer'
import {getUserItemsOneCategory} from '../../reducers/itemsCategoriesReducer'

import ItemsList from './ItemsList';


const ItemsCatSelected = ({selectedDiscItem}) => {
    
    const dispatch = useDispatch()

    const [description, setDescription] = useState(selectedDiscItem.description)

    useEffect(() => {
        dispatch(getUserItemsOneCategory(selectedDiscItem.id))
        setDescription(selectedDiscItem.description)
      }, [dispatch, selectedDiscItem])

    
    const handleUpdateTitleItem = (e) => {
        setDescription(e.target.value)
        const itemObject = {id:selectedDiscItem.id, description:e.target.value}
        setTimeout(() => {
        dispatch(updateItemDescriptionUserCategory(itemObject))
          }, 500);
    }

    return (
        <div className='itemsListElements'>
            <div className='itemsListElementsTop'>
                <div className='itemsListElementsTop1'>
                    {selectedDiscItem.defaultAdmin ?
                    <h4 className='itemTitle'>Items to discuss at the {selectedDiscItem.description}</h4> 
                    :
                    <>
                        <h4 className='itemTitle'>Items to discuss at the </h4>
                        <input type="text" className='itemTitleInput' placeholder="enter your item" value={description} onChange={(e) => handleUpdateTitleItem(e)} />  
                    </>
                    } 
                </div>
            </div>
            <ItemsList selectedDiscItem={selectedDiscItem}/>
        </div>
    )
}

export default ItemsCatSelected