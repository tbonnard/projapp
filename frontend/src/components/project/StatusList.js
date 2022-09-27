import React from 'react'
import { useSelector } from 'react-redux'

import Status from './Status'

const StatusList = ({items, type}) => {

    const statusElements = useSelector(state => state.status)

    if (!statusElements) {
        return null
    }

    return (
        <div className='statusBoard'>
            {statusElements.map(stat => <Status statusItem={stat} type={type} itemsByStatus={items.filter(item => item.status === stat.id)} key={stat.id}/>)}
        </div>
    )
}

export default StatusList