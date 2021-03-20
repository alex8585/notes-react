import {combineReducers} from 'redux';


import notesReducer from './Pages/Notes/Redux/reducer.js';
const rootReducer = combineReducers(
    {
        notes:notesReducer,
    }
)
export default rootReducer;