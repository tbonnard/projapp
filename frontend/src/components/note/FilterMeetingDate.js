import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { unFilterMeetingNoteDate, filterMeetingNoteDate } from '../../reducers/filterNoteMeetingDateReducer'
import { getUserNoteDate, getUserNote } from '../../reducers/NotesReducer'
import { unselectNote } from '../../reducers/selectNoteReducer'
import { noteSavedReducer } from '../../reducers/selectNoteSavedReducer'

import meetingIcon from '../../files/meetingIcon.svg'

const FilterMeetingDate = () => {

    const dispatch = useDispatch()

    const filterNoteMeetingDate = useSelector(state => state.filterNoteMeetingDate)

    const handleFilter = (e) => {
        dispatch(noteSavedReducer())
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
            <div className='iconButtonSectionAction'>
                <button className='buttonIcons buttonIconsSelected' onClick={handleFilter}><img className='iconSelected' src={meetingIcon} title='See all notes'  alt='See all notes' /></button>
                <span className='iconButtonSectionActionText'>Filter by meeting</span>
            </div>
            :
            <div className='iconButtonSectionAction'>
                <button className='buttonIcons' onClick={handleFilter} title='Filter by meeting notes' ><img className='icons' src={meetingIcon} title='Filter by meeting notes'  alt='Filter by meeting notes' /></button>
                <span className='iconButtonSectionActionText'>Filter by meeting</span>
            </div>
            }
        </div>
    )
}

export default FilterMeetingDate