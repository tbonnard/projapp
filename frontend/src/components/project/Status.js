import React from 'react'

import ItemProject from './ItemProject'


const Status = ({statusItem, itemsByStatus, type}) => {


    return (
        <div className='statusList'>
            <div className=''>
                <h5 className='statusListTitleText'>{statusItem.description}</h5>
            </div>
            {itemsByStatus.map(item => <ItemProject type={type} key={item.id} item={item}/>)}
        </div>
    )
}

export default Status