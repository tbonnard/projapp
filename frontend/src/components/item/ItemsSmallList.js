import React from 'react'
import { useSelector } from 'react-redux'

import ItemCategorySmall from './ItemCategorySmall'

const ItemsSmallList = () => {

    const categories = useSelector(state => state.categories)
    
    return (
            <div>
                {categories.map(cat => <ItemCategorySmall key={cat.id} category={cat}/>)}
            </div>    
    )
}

export default ItemsSmallList