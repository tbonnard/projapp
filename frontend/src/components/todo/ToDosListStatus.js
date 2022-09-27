import React from 'react'

import StatusList from '../project/StatusList'

const ToDosListStatus = ({todos, projectIdSelected}) => {


    if (!todos) {
        return null
    }

    return (
        <div>
            {projectIdSelected === null ? 
            <StatusList items={todos} type={1} />
            :
            <StatusList items={todos.filter(item => item.project === projectIdSelected)} type={1} />
            }
            
        </div>
    )
}

export default ToDosListStatus