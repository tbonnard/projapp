import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNote } from '../../reducers/NotesReducer'


const NoteCreateForm = () => {

    const dispatch = useDispatch()

    const projectIdSelected = useSelector(state => state.projectSelected)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {title: title, description:description, project:projectIdSelected}
        dispatch(createNote(itemObject))
        setDescription('')
        setTitle('')
    }

    return (
        <div>
            <h2>Create a note</h2>

            <form onSubmit={handleCreateItem}>
            <div className='createFormLeft'>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} /> 
                <textarea  placeholder='your description' value={description} onChange={(e) => setDescription(e.target.value)} rows="1" cols="50"/>
                <button type='submit'>Create</button>
            </div>
            </form>
        </div>
    )
}

export default NoteCreateForm