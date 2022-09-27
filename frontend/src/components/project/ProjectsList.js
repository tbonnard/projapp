import React from 'react'
import { useSelector} from 'react-redux'


import ProjectsListItem from './ProjectsListItem'
import ProjectCreateForm from './ProjectCreateForm'


const ProjectsList = ({projects}) => {


    const projectIdSelected = useSelector(state => state.projectSelected)

    const defaultValueFakeValue = '000'
    const newProj = {projectName:'All', id:defaultValueFakeValue}
    let newProjectsList = [...projects];

    let alreadyCreted=false
    for (let i in projects) {
        if (projects[i].id === defaultValueFakeValue) {
            alreadyCreted=true
        }
      }
    if (!alreadyCreted) {
        newProjectsList.unshift(newProj)
    }


    return (
        <div>
            <div className='projectList'>
                <div className='sectionRighColumnFilter'> 
                    {projects.map(proj => <ProjectsListItem key={proj.id} project={proj} projectIdSelected={projectIdSelected}/>)} 
                </div>
                <ProjectCreateForm />
            </div>
        </div>
    )
}

export default ProjectsList