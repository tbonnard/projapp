import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import { deactivateItemToDo, updateToDo, updateToDoProject, updateToDoStatus } from '../../reducers/itemsToDoReducer'
import { getNote } from '../../reducers/getNoteReducer'

import seeNote from '../../files/see_note.svg';

const ToDo = ({item, projects, status}) => {
    const dispatch = useDispatch()

    const history = useHistory();

    const [description, setDescription] = useState(item.title)
    const [color, setColor] = useState('')

    useEffect(() => {
        projects.forEach( i => {
            if (i.id === item.project) {
                setColor(i.color)
            }
        }) 
      }, [item, projects])


    const handleDone = (e) => {
        // console.log(e.target.checked)
        const itemObject = {id:item.id}
        dispatch(deactivateItemToDo(itemObject))
    }

    const handleSaveAutoDesc = (e) => {
        setDescription(e.target.value)
        const itemObject = {id:item.id, title:e.target.value}
        setTimeout(() => {
        dispatch(updateToDo(itemObject))
          }, 500);
    }

    
    const handleChangeProject = (e) => {
        //console.log(e.target.value)
        const itemObject = {id:item.id, projectId:e.target.value}
        dispatch(updateToDoProject(itemObject))
    }

    const handleChangeStatus = (e) => {
        const itemObject = {id:item.id, statusId:e.target.value}
        dispatch(updateToDoStatus(itemObject))
    }
      
    const handleSeeNote = () => {
        dispatch(getNote(item.relatedNote))
        let path = `notes`; 
        history.push(path);
    }


    if (projects.length === 0) {
        return null
    }
    
    return (
        <div className='item' >
            <div className='itemSection1'>
                <div>
                    <input type="checkbox" className='checkboxClass' title='Mark as Done and archive' onClick={(e) => handleDone(e)} />
                </div>
                <div className='lineItem'>
                    <input type="text" placeholder="title" value={description} onChange={handleSaveAutoDesc} />   
                </div>
            </div>

            <div className='itemSection2'>
                {item.relatedNote &&
                <div>
                    <img className='icons iconsBlue' src={seeNote} onClick={handleSeeNote} title='See the associated note' alt='See the associated note' />
                </div>
                }

                <div className='selectDiv'>
                    <select name="status" value={item.status} onChange={(e) => handleChangeStatus(e)}>
                    {status.map(stat => <option key={stat.id} value={stat.id}>{stat.description}</option> )}
                    </select>
                </div>
                <div className='selectDivProj' style={{backgroundColor: color}}>
                    <select className='selectProj' name="projects" value={item.project} onChange={(e) => handleChangeProject(e)}>
                    {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.projectName}</option> )}
                    </select>
                </div>

            </div>

        </div>
    )
}

export default ToDo