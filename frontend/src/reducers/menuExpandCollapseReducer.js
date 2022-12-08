
export const changeMenuView = (currentView, currentViewRight) => {
    return async dispatch => {
        dispatch({
            type: "CHANGE_MENU_VIEW_LEFT",
            data: {left:!currentView, right:currentViewRight}
            })
    }
}


export const collapseMenuView = (currentViewRight) => {
    return async dispatch => {
        dispatch({
            type: "COLLAPSE_MENU_VIEW_LEFT",
            data: {left:false, right:currentViewRight}
            })
    }
}


export const changeMenuViewRight = (currentView, currentViewRight) => {
    return async dispatch => {
        dispatch({
            type: "CHANGE_MENU_VIEW_RIGHT",
            data: {left:currentView, right:!currentViewRight}
            })
    }
}


export const collapseMenuViewRight = (currentView) => {
    return async dispatch => {
        dispatch({
            type: "COLLAPSE_MENU_VIEW_RIGHT",
            data: {left:currentView, right:false}
            })
    }
}


export const setMenuMobileView = () => {
    return async dispatch => {
        dispatch({
            type: "SET_MOBILE_MENU_VIEW",
            data: {left:false, right:false}
            })
    }
}

const menuExpandCollapseReducer = (state={left:true, right:true}, action) => {
    switch(action.type) {
        case 'CHANGE_MENU_VIEW_LEFT':
            return action.data
        case 'COLLAPSE_MENU_VIEW_LEFT':
            return action.data
        case 'CHANGE_MENU_VIEW_RIGHT':
                return action.data
        case 'COLLAPSE_MENU_VIEW_RIGHT':
                return action.data
        case 'SET_MOBILE_MENU_VIEW':
            return action.data
        default:
            return state
    }

}

export default menuExpandCollapseReducer