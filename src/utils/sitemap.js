import settings from '@nobia/zeus-components/lib/settings'
import sm from 'sitemap'
import logger from '@nobia/zeus-react-server/logger'
import fetch from 'node-fetch'

const CACHE_TIME = 5 * 60 * 1000 // 5 min
let cachedUrls = []

const build = (urls) => {
  const sitemap = sm.createSitemap({
    hostname: settings.baseUrl,
    cacheTime: CACHE_TIME,
    urls,
  })
  return new Promise((resolve, reject) =>
    sitemap.toXML((err, xml) => {
      if (err) {
        reject(err)
      } else {
        resolve(xml)
      }
    })
  )
}

const updateUrls = () => {
  const url = new URL(settings.gatewayAPI)
  return fetch(`${url.origin}/urls?brand=${settings.brand}`)
    .then((r) => r.json())
    .then((urls) => {
      cachedUrls = [...urls]
    })
    .catch((e) => logger.error(e))
}

const setupRefreshUrls = () => {
  updateUrls()
  setInterval(updateUrls, CACHE_TIME)
}

const getUrls = () => Promise.resolve(cachedUrls)

const sitemap = (req, res) => {
  getUrls()
    .then((urls) => build(urls.map((url) => ({ url }))))
    .then((xml) => {
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
    .catch((e) => {
      logger.fatal(`getUrls() failed`, e)
      res.sendStatus(500)
    })
}
export { getUrls, setupRefreshUrls }
export default sitemap
