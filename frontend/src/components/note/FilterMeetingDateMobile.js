import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { unFilterMeetingNoteDate, filterMeetingNoteDate } from '../../reducers/filterNoteMeetingDateReducer'
import { getUserNoteDate, getUserNote } from '../../reducers/NotesReducer'
import { unselectNote } from '../../reducers/selectNoteReducer'

import meetingIcon from '../../files/meetingIcon.svg'

const FilterMeetingDateMobile = () => {

    const dispatch = useDispatch()

    const filterNoteMeetingDate = useSelector(state => state.filterNoteMeetingDate)

    const handleFilter = (e) => {
        e.preventDefault()
        if (filterNoteMeetingDate) {
            dispatch(unFilterMeetingNoteDate())
            dispatch(getUserNote())
            dispatch(unselectNote())
        } else {
            dispatch(filterMeetingNoteDate())
            dispatch(getUserNoteDate())
            dispatch(unselectNote())
        }
    }

    return (
        <div className=''>
            {filterNoteMeetingDate ? 
                <button className='buttonIcons buttonIconsSelected' onClick={handleFilter}><img className='iconSelected' src={meetingIcon} title='See all notes'  alt='See all notes' /></button>
            :
                <button className='buttonIcons' onClick={handleFilter} title='Filter by meeting notes' ><img className='icons' src={meetingIcon} title='Filter by meeting notes'  alt='Filter by meeting notes' /></button>
            }
        </div>
    )
}

export default FilterMeetingDateMobile