import { createApp, createServer } from '@nobia/zeus-react-server/server'
import logger from '@nobia/zeus-react-server/logger'
import config from '@nobia/zeus-react-server/config'
import render from '@nobia/zeus-react-server/render'
import routes from './routes'
import sitemap, { getUrls, setupRefreshUrls } from './utils/sitemap'
import downloadImage from './utils/downloadImage'

setupRefreshUrls()

const setup = (app) => {
  app.get('/download-image', downloadImage)
  app.get('/sitemap.xml', sitemap)
  app.get('*', (req, res, next) => {
    const segments = req.path.replace(/^\/+|\/+$/g, '').split('/')
    const isFilter = segments.slice(-1).find((u) => u.indexOf('---') >= 0)
    if (isFilter) {
      next()
      return
    }
    if (segments.indexOf('link') >= 0) {
      next()
      return
    }
    if (req.path === '/') {
      next()
      return
    }
    getUrls()
      .then((urls) => {
        if (urls.indexOf(req.path) >= 0) {
          next()
        } else {
          logger.info(
            `url '${req.path}' not found in urlcollection (${urls.length})`
          )
          res.status(404)
          res.end()
        }
      })
      .catch((e) => {
        logger.fatal(`getUrls() failed`, e)
        res.sendStatus(500)
      })
  })
  app.get('*', render('index', config))
}

let app = createApp({ setup })

const server = createServer(app)

if (module.hot) {
  logger.info('✅  Server-side HMR Enabled!')

  module.hot.accept('./routes', () => {
    logger.info('🔁  HMR Reloading `./server.js`...')

    server.removeListener('request', app)
    app = createApp({ routes, setup })
    server.on('request', app)
  })
}
