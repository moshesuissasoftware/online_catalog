import https from 'https'
import getImage from '@nobia/zeus-components/lib/image/getCloudinaryImage'

/* eslint-disable no-console */
const downloadImage = (req, res) => {
  const url = getImage({ width: 2000, height: 2000, crop: 'fit' })(
    req.query.url
  )
  console.log(url)
  const filename = req.query.filename
  res.setHeader('Content-disposition', `attachment; filename=${filename}`)
  res.setHeader('Content-type', 'image/jpg')
  https.get(url, response => {
    response.pipe(res)
  })
}

export default downloadImage
