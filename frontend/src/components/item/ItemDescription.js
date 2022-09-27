import React  from 'react'
import { useSelector } from 'react-redux'


import ItemsCatSelected from './ItemsCatSelected'


const ItemDescription = () => {

    const selectedDiscItem = useSelector(state => state.selectedDiscussionItem)

    if (!selectedDiscItem) {
        return <div>no item, create a new one</div>
    }
    
    return (
            <ItemsCatSelected selectedDiscItem={selectedDiscItem} />
    )
}

export default ItemDescription