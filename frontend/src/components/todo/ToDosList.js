import React, { useEffect, useState } from 'react'

import ToDo from './ToDo'


const ToDosList = ({items, projects, status}) => {


    if (items.length===0) {
        return (
            <div>
                <p className='infoText'>no to do yet</p>
            </div>
        )
    }

    if ( !projects) {
        return null
    }
    
 
    return (
        <div className='' >
            {items.map((todo, ind) => <ToDo key={todo.id} item={todo} projects={projects} status={status} /> )}
        </div>
    )
}

export default ToDosList