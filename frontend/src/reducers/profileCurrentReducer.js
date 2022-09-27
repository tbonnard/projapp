import profileServices from '../services/profile'
import {getUserProfiles} from '../reducers/profilesReducer'

export const getCurrentProfile = () =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const profile = await profileServices.getCurrentUserProfile(user.token)
        dispatch({
            type: "GET_CURRENT_PROFILE",
            data: profile
            })
        }
    }

export const changeCurrentProfile = (itemObject) =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const profile = await profileServices.changeCurrentProfile(user.token,itemObject)
        dispatch({
            type: "CHANGE_CURRENT_ROFILE",
            data: profile
            })
        }
    }


const profileCurrentReducer = (state=null, action) => {
    switch(action.type) {
        case 'GET_CURRENT_PROFILE':
            return action.data
        case 'CHANGE_CURRENT_ROFILE':
                return action.data
        default:
            return state
    }

}



export default profileCurrentReducer