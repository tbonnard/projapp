import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateItemProjectProject, updateItemProjectTitle, updateStatusItemProject } from '../../reducers/itemsProjectsReducer'
import { updateToDo, updateToDoProject, updateToDoStatus } from '../../reducers/itemsToDoReducer'

const ItemProject = ({ item, type }) => {

    const dispatch = useDispatch()

    const status = useSelector(state => state.status)
    const projects = useSelector(state => state.projects)

    const [title, setTitle] = useState(item.title)
    const [color, setColor] = useState('')
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        projects.forEach( i => {
            if (i.id === item.project) {
                setColor(i.color)
            }
        }) 
      }, [item, projects])

    const handleChange = (e) => {
        if(type===0) {
            dispatch(updateStatusItemProject({id:item.id, status:e.target.value}))
        } else if (type===1) {
            const itemObject = {id:item.id, statusId:e.target.value}
            dispatch(updateToDoStatus(itemObject))
            type=0
        }
    }

    const handleChangeProject = (e) => {
        const itemObject = {id:item.id, projectId:e.target.value}
        if(type===0) {
            dispatch(updateItemProjectProject(itemObject))
        } else if (type===1) {
            const itemObject = {id:item.id, projectId:e.target.value}
            dispatch(updateToDoProject(itemObject))
            type=0
        }
    }

    const handleSaveAutoDesc = (e) => {
        setTitle(e.target.value)
        const itemObject = {id:item.id, title:e.target.value}
        if(type===0) {
            setTimeout(() => {
                dispatch(updateItemProjectTitle(itemObject))
            }, 500);
        } else if (type===1) {
            const itemObject = {id:item.id, title:e.target.value}
            setTimeout(() => {
            dispatch(updateToDo(itemObject))
              }, 500);
              type=0
        }
    }

    const handleChangeEditMode = () => {
        if (editMode) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }

    return (
        <div className='statusItem' >
            <div className='itemProjectTitle'>
                {editMode ? 
                <textarea placeholder="title" value={title} onChange={handleSaveAutoDesc} >
                </textarea> :
                <p onClick={handleChangeEditMode}>{title}</p>
                }
            </div>
            <div onClick={handleChangeEditMode}>
                <select name="status" value={item.status} onChange={(e) => handleChange(e)}>
                    {status.map(stat => <option key={stat.id} value={stat.id}>{stat.description}</option> )}
                </select>
        
                <div className='selectDivProj'>
                    <select className='selectProj' style={{backgroundColor: color}} name="projects" value={item.project} onChange={(e) => handleChangeProject(e)}>
                    {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.projectName}</option> )}
                    </select>
                </div>
            </div>
        </div>
    )
}



export default ItemProject