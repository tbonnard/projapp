import React from 'react'

import Daily from './Daily'

const DailyList = ({items, limitDaily}) => {

    if (items.length===0) {
        return (
            <div>
                <p className='infoText'>no daily yet</p>
            </div>
        )
    }
    
    return (
        <div className='itemList' >
            {items.map((dailyItem, ind) => <Daily key={dailyItem.id} item={dailyItem} limitDaily={limitDaily}/> )}
        </div>
    )
}

export default DailyList