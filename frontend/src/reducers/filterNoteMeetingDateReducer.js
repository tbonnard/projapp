
export const filterMeetingNoteDate = () => {
    return async dispatch => {
        dispatch({
            type: "FILTER_MEETING_DATE_NOTE",
            data: true
            })
    }
}

export const unFilterMeetingNoteDate = () => {
    return async dispatch => {
        dispatch({
            type: "UNFILTER_MEETING_DATE_NOTE",
            data: false
            })
    }
}

const filterNoteMeetingDateReducer = (state=false, action) => {
    switch(action.type) {
        case 'FILTER_MEETING_DATE_NOTE':
            return action.data
        case 'UNFILTER_MEETING_DATE_NOTE':
            return action.data
        default:
            return state
    }

}

export default filterNoteMeetingDateReducer