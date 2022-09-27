import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createUserCategory } from '../../reducers/categoriesReducer'
import { unCreateCategoryCheck } from '../../reducers/categoryCreateReducer'

const ItemCreateCategoryForm = () => {

    const dispatch = useDispatch()

    const categoryCreateCheck = useSelector(state => state.categoryCreateCheck)

    const [description, setDescription] = useState('')

    const handleCreateCategory = (e) => {
        e.preventDefault()
        const itemObject = {description:description}
        dispatch(unCreateCategoryCheck())
        dispatch(createUserCategory(itemObject))
        setDescription('')
    }

    const handleClickRemove = (e) => {
        e.preventDefault()
        dispatch(unCreateCategoryCheck())
    }

    if (!categoryCreateCheck) {
        return null
    }


    return (
        <div className='createItemFormGlobal'>

            <form onSubmit={handleCreateCategory}>
            <div className='itemTopRightSection'>
                <div className='itemTopRightSectionLeft'>
                    <input type="text" placeholder={`new group`} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='itemTopRightSectionRight'>
                    <button type='submit'>Create</button>
                    <button className='buttonLight' onClick={handleClickRemove}>cancel</button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default ItemCreateCategoryForm