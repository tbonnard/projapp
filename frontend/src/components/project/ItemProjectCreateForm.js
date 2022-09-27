import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createItemProject } from '../../reducers/itemsProjectsReducer'

const ItemProjectCreateForm = () => {

    const dispatch = useDispatch()
    const projectIdSelected = useSelector(state => state.projectSelected)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {title: title, description:description, project:projectIdSelected}
        dispatch(createItemProject(itemObject))
        setTitle('')
        setDescription('')
    }

    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
    }

    return (
        <div className='bottomFormGlobal'>
        <form onSubmit={handleCreateItem}>
            <div className='createFormLeft'>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} /> 
            <button type='submit'>Create</button>
            </div>
        </form>
        </div>
    )
}

export default ItemProjectCreateForm