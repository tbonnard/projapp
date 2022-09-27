import React, {useState } from 'react'
import { useDispatch } from 'react-redux'

import {deactivateProject, updateTitleProject, updateColorProject} from '../../reducers/projectReducer'


const ProjectSetup = ({project}) => {

    const dispatch = useDispatch()

    const [projectNameTitle, setProjectNameTitle] = useState(project.projectName)
    const [color, setColor] = useState(project.color)

    const handleSave = (e) => {
        setProjectNameTitle(e.target.value)
        const itemObject = {id:project.id, projectName:e.target.value}
        //console.log(itemObject)
        setTimeout(() => {
            dispatch(updateTitleProject(itemObject))
              }, 500);
    }

    const handleColor = (e) => {
        setColor(e.target.value)
        const itemObject = {id:project.id, color:e.target.value}
        //console.log(itemObject)
       dispatch(updateColorProject(itemObject))
    }

    const handleDelete = () => {
        const itemObject = {id:project.id}
        dispatch(deactivateProject(itemObject))
    }


    return (
        <div className='item' >
            <div className='lineItem'>
                <input type="text" placeholder="title" value={projectNameTitle} onChange={(e) => handleSave(e)} />   
            </div>
            <div>
                <input type="color" id="colorpicker" className="colorPicker" value={color} onChange={(e) => handleColor(e)}/>
            </div>
            <div>
                <button className='buttonLight' onClick={handleDelete}>archive</button>
            </div>
       
        </div>
    )
}

export default ProjectSetup