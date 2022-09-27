import React from 'react'
import { useDispatch } from 'react-redux'

import { createDaily } from '../../reducers/dailyReducer'

const DailyCreateForm = ({limitDaily}) => {

    const dispatch = useDispatch()

    const handleCreateItem = (e) => {
        e.preventDefault()
        const itemObject = {description:''}
        dispatch(createDaily(itemObject, limitDaily))
        setDescription('')
    }
    
    return (
        <div className=''>
            <form onSubmit={handleCreateItem}>
                    <button type='submit' className='dailyCreateButton'>add a new daily</button>
            </form>
        </div>
    )
}

export default DailyCreateForm