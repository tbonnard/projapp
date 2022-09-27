
export const createCategoryCheck = () => {
    return async dispatch => {
        dispatch({
            type: "CREATE_CATEGORY",
            data: true
            })
    }
}

export const unCreateCategoryCheck = () => {
    return async dispatch => {
        dispatch({
            type: "UNCREATE_CATEGORY",
            data: false
            })
    }
}

const categoryCreateReducer = (state=false, action) => {
    switch(action.type) {
        case 'CREATE_CATEGORY':
            return action.data
        case 'UNCREATE_CATEGORY':
            return action.data
        default:
            return state
    }

}

export default categoryCreateReducer