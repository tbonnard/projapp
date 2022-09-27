
export const createProjectCheck = () => {
    return async dispatch => {
        dispatch({
            type: "CREATE_PROJECT",
            data: true
            })
    }
}

export const unCreateProjectCheck = () => {
    return async dispatch => {
        dispatch({
            type: "UNCREATE_PROJECT",
            data: false
            })
    }
}

const projectCreateCheckReducer = (state=false, action) => {
    switch(action.type) {
        case 'CREATE_PROJECT':
            return action.data
        case 'UNCREATE_PROJECT':
            return action.data
        default:
            return state
    }

}

export default projectCreateCheckReducer