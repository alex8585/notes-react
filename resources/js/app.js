import React from 'react';
import { render } from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import * as Sentry from '@sentry/browser';
import NProgress from 'nprogress';
import { Inertia } from '@inertiajs/inertia';
import ThemeContext, {themes} from '@/Context/ThemeContext';
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

const app = document.getElementById('app');

render(
   <ThemeContext.Provider value={themes.dark}><InertiaApp
    initialPage={JSON.parse(app.dataset.page)}
    resolveComponent={name =>
      import(`./Pages/${name}`).then(module => module.default)
    }
  /></ThemeContext.Provider>,
  app
);
