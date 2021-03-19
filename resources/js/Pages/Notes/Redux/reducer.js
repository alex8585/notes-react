
import produce from 'immer';
import { SET_CURRENT_ITEM } from './constants';

// The initial state of the App
export const initialState = {
  currentItem: {
    title: '',
    category_id:'',
    body:'',
  },
};

/* eslint-disable default-case, no-param-reassign */
const notesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CURRENT_ITEM:
        draft.currentItem = action.payload;
        break;
    }
  });

export default notesReducer;
