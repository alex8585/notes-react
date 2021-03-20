import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootSaga from '@/rootSaga.js';


const staticReducers = {
    "emptyReducer": (state, action) => { return {} }
}

export default function configureStore() {
    
    const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

    

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        createReducer(), 
        {}, 
        composeSetup(
            applyMiddleware(thunk, sagaMiddleware)
        )
    );

    store.asyncReducers = {}

    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer
        store.replaceReducer(createReducer(store.asyncReducers))
    }

    //store.runSaga = sagaMiddleware.run;
    store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);

    
    return store;
}

function createSagaInjector(runSaga, rootSaga) {
    // Create a dictionary to keep track of injected sagas
    const injectedSagas = new Map();

    const isInjected = key => injectedSagas.has(key);

    const injectSaga = (key, saga) => {
        // We won't run saga if it is already injected
        if (isInjected(key)) return;

        // Sagas return task when they executed, which can be used
        // to cancel them
        const task = runSaga(saga);

        // Save the task if we want to cancel it in the future
        injectedSagas.set(key, task);
    };

    // Inject the root saga as it a staticlly loaded file,
    injectSaga('root', rootSaga);

    return injectSaga;
}

function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers
    })
}