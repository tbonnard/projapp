import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserStatus } from '../../reducers/statusReducer'
import { getUserProjects } from '../../reducers/projectReducer'
import { getUserItemsProjects } from '../../reducers/itemsProjectsReducer'
import { projectUnselect } from '../../reducers/projectSelectedReducer'

import StatusList from './StatusList'


const Projects = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const itemsProjects = useSelector(state => state.itemsProjects)
    const projectIdSelected = useSelector(state => state.projectSelected)

    useEffect(() => {
        dispatch(getUserStatus())
        dispatch(getUserProjects())
        dispatch(getUserItemsProjects())
        dispatch(projectUnselect())
      }, [dispatch])

    if (!user) {
        return null
    }
    
    return (
        <div className='containerGlobal'>
            {projectIdSelected===null ? 
            <StatusList items={itemsProjects} type={0}/>
            :
            <StatusList items={itemsProjects.filter(item => item.project === projectIdSelected)} type={0}/>
            }
        </div>
    )
}

export default Projects