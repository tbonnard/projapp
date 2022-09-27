
export const displayAddItem = (categoryId) => {
    return async dispatch => {
        dispatch({
            type: "ADD_ITEM",
            data: categoryId
            })
    }
}

export const hideAddItem = () => {
    return async dispatch => {
        dispatch({
            type: "HIDE_ADD_ITEM",
            data: null
            })
    }
}

const addItemReducer = (state=null, action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            return action.data
        case 'HIDE_ADD_ITEM':
            return action.data
        default:
            return state
    }

}

export default addItemReducer