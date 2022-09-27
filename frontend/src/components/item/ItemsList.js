import React from 'react'
import {useSelector } from 'react-redux'


import Item from './Item'


const ItemsList = ({selectedDiscItem}) => {
    

    const items = useSelector(state => state.itemsCategories)
      
    return (
        <div className=''>
            {items.map(item => <Item key={item.id} item={item}/>)}
            {items.length===0 && <p className='infoText'>Add a new item you want to discuss regarding the {selectedDiscItem.description}</p>}
        </div>
    )
}

export default ItemsList