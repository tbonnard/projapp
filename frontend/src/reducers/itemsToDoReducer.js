import todosServices from '../services/todos'

export const getUserItemsToDo = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "GET_USER_ITEMS_TODO",
            data: items
            })
    }
}

export const createItemToDo = (itemObject) => {
    return async dispatch => {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
            const user = await JSON.parse(loggedUserJSON)
            const newItemToDo = await todosServices.createItemTodo(user.token, itemObject)
            const items = await todosServices.getUserItemsTodo(user.token)
            dispatch({
                type: "NEW_ITEMS_TODO",
                data: items
                })
 
    }
}

export const deactivateItemToDo = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const deactivatedItemToDo = await todosServices.deactivateItemTodo(user.token, itemObject)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "DEACTVATE_ITEMS_TODO",
            data: items
            })
    }
}

export const updateToDo = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedItemToDo = await todosServices.updateItemTodo(user.token, itemObject)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "UPDATE_ITEMS_TODO",
            data: items
            })
    }
}


export const updateToDoProject = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedItemToDo = await todosServices.updateItemTodoProject(user.token, itemObject)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "UPDATE_PROJECT_ITEMS_TODO",
            data: items
            })
    }
}

export const updateToDoStatus = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedItemToDo = await todosServices.updateItemTodoStatus(user.token, itemObject)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "UPDATE_STATUS_ITEMS_TODO",
            data: items
            })
    }
}

export const updateToDoOrder = (itemObject) => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const updatedItemToDo = await todosServices.updateToDoOrder(user.token, itemObject)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "UPDATE_ORDER_ITEMS_TODO",
            data: items
            })
    }
}

export const archiveDoneTodos = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        const user = await JSON.parse(loggedUserJSON)
        const archiveToDos = await todosServices.archiveDoneToDos(user.token)
        const items = await todosServices.getUserItemsTodo(user.token)
        dispatch({
            type: "ARCHIVE_TODOS",
            data: items
            })
    }
}

const itemsToDoReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_USER_ITEMS_TODO':
            return action.data
        case 'NEW_ITEMS_TODO':    
            return action.data
        case 'UPDATE_PROJECT_ITEMS_TODO':    
            return action.data
        case 'UPDATE_STATUS_ITEMS_TODO':    
            return action.data
        case 'UPDATE_ITEMS_TODO':    
            return action.data
            //return [...state, action.data]
        case 'UPDATE_ORDER_ITEMS_TODO':    
            return state
        case 'DEACTVATE_ITEMS_TODO':    
            return action.data
        case 'ARCHIVE_TODOS':    
            return action.data
        default:
            return state
    }
}

export default itemsToDoReducer