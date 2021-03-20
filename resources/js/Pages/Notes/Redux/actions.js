
import { SET_CURRENT_ITEM} from './constants';
import { SORT_NOTES } from './constants';

export function setCurrentItem(item) {
  return {
    type: SET_CURRENT_ITEM,
    payload:item,
  };
}

export function sortNotes(params) {
  return {
      type: SORT_NOTES,
      payload:params
  }

}