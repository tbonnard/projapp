import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNote } from '../../reducers/NotesReducer'


const AddNote = () => {

    const dispatch = useDispatch()

    const projectIdSelected = useSelector(state => state.projectSelected)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleCreateNote = (e) => {
        e.preventDefault()
        const itemObject = {title: title, description:description, project:projectIdSelected}
        dispatch(createNote(itemObject))
        setDescription('')
        setTitle('')
    }


    return (
        <div className='addButtonNote'>
            <button onClick={handleCreateNote}>New note</button>
        </div>
    )
}

export default AddNote