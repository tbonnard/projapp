export const selectNoteIndicator = () => {
    return async dispatch => {
        dispatch({
            type: "NOTE_INDIC",
            data: ''
            })
    }
}

const selectNoteIndicatorReducer = (state=true, action) => {
    switch(action.type) {
        case 'NOTE_INDIC':
            return !state
        default:
            return state
    }
}

export default selectNoteIndicatorReducer