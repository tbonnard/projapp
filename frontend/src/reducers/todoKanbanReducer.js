
export const changeKanbanView = (currentView) => {
    return async dispatch => {
        dispatch({
            type: "CHANGE_VIEW",
            data: !currentView
            })
    }
}

export const backListView = () => {
    return async dispatch => {
        dispatch({
            type: "BACK_LIST_VIEW",
            data: false
            })
    }
}

const todoKanbanReducer = (state=false, action) => {
    switch(action.type) {
        case 'BACK_LIST_VIEW':
            return action.data
        case 'CHANGE_VIEW':
            return action.data
        default:
            return state
    }

}

export default todoKanbanReducer