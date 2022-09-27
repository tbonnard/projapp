import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createItemToDo } from '../../reducers/itemsToDoReducer'


const ToDoCreateForm = () => {

    const dispatch = useDispatch()

    const projectIdSelected = useSelector(state => state.projectSelected)

    const [description, setDescription] = useState('')

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {title:description, project:projectIdSelected}
        dispatch(createItemToDo(itemObject))
        setDescription('')
    }
    
    return (
        <div>
            <form onSubmit={handleCreateItem}>
                <div className='createFormLeft'>
                <input type="text" placeholder='+ new to do' value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default ToDoCreateForm