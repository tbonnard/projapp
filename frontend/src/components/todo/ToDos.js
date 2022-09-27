import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {getUserItemsToDo} from '../../reducers/itemsToDoReducer'
import { getUserProjects } from '../../reducers/projectReducer'
import { projectUnselect } from '../../reducers/projectSelectedReducer'
import { getUserStatus } from '../../reducers/statusReducer'

import ToDosList from './ToDosList'
import ToDosListStatus from './ToDosListStatus'



const ToDos = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const todos = useSelector(state => state.todos)
    const projects = useSelector(state => state.projects)
    const projectIdSelected = useSelector(state => state.projectSelected)
    const status = useSelector(state => state.status)
    const todosViewKanban=useSelector(state=>state.kanbanView)

    useEffect(() => {
        dispatch(getUserStatus())
        dispatch(getUserProjects())
        dispatch(getUserItemsToDo())
        dispatch(projectUnselect())
      }, [dispatch])


    if (!user) {
        return null
    }

    
    return (
        <div className='containerGlobal'>
             {todosViewKanban ===true ? <ToDosListStatus todos={todos} projectIdSelected={projectIdSelected}/>
             : projectIdSelected === null ? 
             <ToDosList items={todos} projects={projects} status={status} />
            :
            <ToDosList items={todos.filter(item => item.project === projectIdSelected)} projects={projects} status={status} />
             }
         </div>
    )
}


export default ToDos