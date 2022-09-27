import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { createUserCategory } from '../../reducers/categoriesReducer'

const ItemCreateCategoryForm = () => {

    const dispatch = useDispatch()

    const [description, setDescription] = useState('')

    const handleCreateCategory = (e) => {
        e.preventDefault()
        const itemObject = {description:description}
        dispatch(createUserCategory(itemObject))
        setDescription('')
    }


    return (

        <div className='bottomFormGlobal'>
        <form onSubmit={handleCreateCategory}>
            <div className='createFormLeft'>
            <input type="text" placeholder={`new discussion/meeting group`} value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type='submit'>Create</button>
            </div>
        </form>
    </div>

    )
}

export default ItemCreateCategoryForm