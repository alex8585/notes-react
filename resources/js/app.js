import React from 'react';
import { render } from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';
//import { InertiaProgress } from '@inertiajs/progress';
import * as Sentry from '@sentry/browser';
import NProgress from 'nprogress';
import { Inertia } from '@inertiajs/inertia';
import ThemeContext, {themes} from '@/Context/ThemeContext';
import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {sagaWatcher} from './Redux/sagas';
import rootReducer from './rootReducer';

let timeout = null


Inertia.on('start', () => {
  timeout = setTimeout(() => NProgress.start(), 1)
})

Inertia.on('progress', (event) => {
  if (NProgress.isStarted() && event.detail.progress.percentage) {
    NProgress.set((event.detail.progress.percentage / 100) * 0.9)
  }
})

Inertia.on('finish', (event) => {
  clearTimeout(timeout)
  if (!NProgress.isStarted()) {
    return
  } else if (event.detail.visit.completed) {
    NProgress.done()
  } else if (event.detail.visit.interrupted) {
    NProgress.set(0)
  } else if (event.detail.visit.cancelled) {
    NProgress.done()
    NProgress.remove()
  }
})

// InertiaProgress.init({
//   color: '#ED8936',
//   showSpinner: true
// });


Sentry.init({
  dsn: process.env.MIX_SENTRY_LARAVEL_DSN
});




const saga = createSagaMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
    rootReducer,
    composeSetup(
        applyMiddleware(thunk, saga),
    )
);

saga.run(sagaWatcher);

const appNode = document.getElementById('app');

const app = (
  <Provider store={store}>
    <ThemeContext.Provider value={themes.dark}>
      <InertiaApp
          initialPage={JSON.parse(appNode.dataset.page)}
          resolveComponent={name =>
            import(`./Pages/${name}`).then(module => module.default)
          }
      />
    </ThemeContext.Provider>
  </Provider>
)

render( app, appNode);
