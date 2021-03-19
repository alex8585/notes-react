
import { SET_CURRENT_ITEM} from './constants';


export function setCurrentItem(item) {
  return {
    type: SET_CURRENT_ITEM,
    payload:item,
  };
}