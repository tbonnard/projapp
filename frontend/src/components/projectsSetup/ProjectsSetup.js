import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'


import { getUserProjects } from '../../reducers/projectReducer'


import ProjectSetup from './ProjectSetup'


const ProjectsSetup = () => {

    const dispatch = useDispatch()

    const projects = useSelector(state => state.projects)

    useEffect(() => {
        dispatch(getUserProjects())
      }, [dispatch])


    return (
        <div className='containerGlobal'>
            <span className='infoText infoTextArchive'>archiving an element archives all its related items</span>
        {projects.filter(proj => !proj.defaultAdmin ).map(pro => <ProjectSetup key={pro.id} project={pro}/>)}
        </div>
    )
}

export default ProjectsSetup