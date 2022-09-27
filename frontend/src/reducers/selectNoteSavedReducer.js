export const noteSavingReducer = () => {
    return async dispatch => {
        dispatch({
            type: "NOTE_SAVING",
            data: true
            })
    }
}

export const noteSavedReducer = () => {
    return async dispatch => {
        dispatch({
            type: "NOTE_SAVED",
            data: false
            })
    }
}

const selectNoteSavedReducer = (state=false, action) => {
    switch(action.type) {
        case 'NOTE_SAVING':
            return action.data
        case 'NOTE_SAVED':
            return action.data
        default:
            return state
    }
}

export default selectNoteSavedReducer