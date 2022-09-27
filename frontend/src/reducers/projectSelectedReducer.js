
export const projectSelect = (projectId) => {
    return async dispatch => {
        dispatch({
            type: "PROJECT_SELECTED",
            data: projectId
            })
    }
}

export const projectUnselect = () => {
    return async dispatch => {
        dispatch({
            type: "PROJECT_UNSELECTED",
            data: null
            })
    }
}

const projectSelectedReducer = (state=null, action) => {
    switch(action.type) {
        case 'PROJECT_SELECTED':
            return action.data
        case 'PROJECT_UNSELECTED':
            return action.data
        default:
            return state
    }

}

export default projectSelectedReducer