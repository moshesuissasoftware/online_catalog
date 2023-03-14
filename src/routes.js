import { asyncComponent } from '@nobia/zeus-components/lib/after'

// Initial static routes object. The rest of the routes can be defined in the
// app using regular react-router setup. Note that only routes defined here will
// be code-split (if using `asyncComponent`) and have `getInitialProps`.

export default [
  {
    path: '*',
    component: asyncComponent({
      loader: () => import('./app'),
    }),
  },
]
