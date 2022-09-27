import {combineReducers, applyMiddleware } from 'redux'
import { legacy_createStore as createStore} from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import notifReducer from './reducers/notifReducer'
import categoriesReducer from './reducers/categoriesReducer'
import itemsCategoriesReducer from './reducers/itemsCategoriesReducer'
import addItemReducer from './reducers/addItemReducer'
import itemsToDoReducer from './reducers/itemsToDoReducer'
import notesReducer from './reducers/NotesReducer'
import statusReducer from './reducers/statusReducer'
import projectsReducer from './reducers/projectReducer'
import itemsProjectReducer from './reducers/itemsProjectsReducer'
import projectSelectedReducer from './reducers/projectSelectedReducer'
import selectNoteReducer from './reducers/selectNoteReducer'
import projectCreateCheckReducer from './reducers/projectCreateReducer'
import categoryCreateReducer from './reducers/categoryCreateReducer'
import filterNoteMeetingDateReducer from './reducers/filterNoteMeetingDateReducer'
import profilesReducer from './reducers/profilesReducer'
import profileCurrentReducer from './reducers/profileCurrentReducer'
import getNoteReducer from './reducers/getNoteReducer'
import dailyReducer from './reducers/dailyReducer'
import todoKanbanReducer from './reducers/todoKanbanReducer'
import limitDailyReducer from './reducers/limitDailyReducer'
import selectDiscussionItemReducer from './reducers/selectDiscussionItemReducer'
import menuExpandCollapseReducer from './reducers/menuExpandCollapseReducer'
import selectNoteIndicatorReducer from './reducers/selectNoteIndicatorReducer'
import selectNoteSavedReducer from './reducers/selectNoteSavedReducer'

const appReducer = combineReducers({
  user: userReducer,
  notif: notifReducer,
  categories:categoriesReducer,
  itemsCategories:itemsCategoriesReducer,
  addItem:addItemReducer,
  todos:itemsToDoReducer,
  notes:notesReducer,
  status:statusReducer,
  projects:projectsReducer,
  itemsProjects:itemsProjectReducer,
  projectSelected: projectSelectedReducer,
  selectedNote: selectNoteReducer,
  projectCreateCheck:projectCreateCheckReducer,
  categoryCreateCheck:categoryCreateReducer,
  filterNoteMeetingDate:filterNoteMeetingDateReducer,
  profiles: profilesReducer,
  profileCurrent:profileCurrentReducer,
  getNote:getNoteReducer,
  daily: dailyReducer,
  kanbanView:todoKanbanReducer,
  limitDaily:limitDailyReducer,
  selectedDiscussionItem:selectDiscussionItemReducer,
  menuExpandCollapse:menuExpandCollapseReducer,
  selectNoteIndicator:selectNoteIndicatorReducer,
  noteSaved:selectNoteSavedReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store