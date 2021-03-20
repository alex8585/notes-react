import{takeEvery, put, call} from 'redux-saga/effects'
import { Inertia } from '@inertiajs/inertia';
import { SORT_NOTES } from './constants';
//import { showOrdersLoader,hideOrdersLoader } from './actions/ordersActions';
import { getUrlQuery } from '@/utils';

export default function* sagaWatcher() {
    yield takeEvery(SORT_NOTES, sagaSortNotes);
}

function* sagaSortNotes (params) {
    
    try {

        let queryParams = params.payload;

        Inertia.get(route( route().current() ), queryParams, {
            //preserveScroll: true,
            replace: true,
            preserveState: true,
            only: ['items','flash'],
        });

        
    } catch(e) {
        console.log(e);
        // yield put(showAlert(e.toString() + ' "getorders"'));
        // yield put(hideOrdersLoader());
    }
    
}







