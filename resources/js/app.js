import React from 'react';
import { render } from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';
import * as Sentry from '@sentry/browser';
import NProgress from 'nprogress';
import { Inertia } from '@inertiajs/inertia';
import ThemeContext, {themes} from '@/Context/ThemeContext';
import { Provider } from 'react-redux';


import configureStore from './configureStore';
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


Sentry.init({
  dsn: process.env.MIX_SENTRY_LARAVEL_DSN
});


const store = configureStore();

const appNode = document.getElementById('app');

const app = (
  <Provider store={store}>
    <ThemeContext.Provider value={themes.light}>
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
