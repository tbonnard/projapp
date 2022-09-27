
export const changeLimitDaily = (currentLimit) => {
    return async dispatch => {
        dispatch({
            type: "CHANGE_LIMIT",
            data: currentLimit+5
            })
    }
}

const limitDailyReducer = (state=5, action) => {
    switch(action.type) {
        case 'CHANGE_LIMIT':
            return action.data
        default:
            return state
    }

}

export default limitDailyReducer