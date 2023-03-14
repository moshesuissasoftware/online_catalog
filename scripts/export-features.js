/* eslint-disable import/no-extraneous-dependencies, no-console */

require('dotenv').config()

const util = require('util')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const prettier = require('@nobia/zeus-prettier')

const writeFile = util.promisify(fs.writeFile)
const MESSAGE_PREFIX = 'app.product.features.'

const run = async (brand = process.env.CONFIG_BRAND) => {
  const brandConfigPath = path.resolve(process.cwd(), 'config', brand)
  const featuresPath = require.resolve(
    path.resolve(brandConfigPath, 'features')
  )
  const messagesPath = require.resolve(
    path.resolve(brandConfigPath, 'messages')
  )

  /* eslint-disable import/no-dynamic-require, global-require */
  const features = require(featuresPath)
  const messages = require(messagesPath)
  /* eslint-enable import/no-dynamic-require, global-require */

  const categoriesRequest = await fetch(
    `https://products-api.dev.nobiadigital.com/${brand}/categories`
  )
  const categories = await categoriesRequest.json()
  const categoryIds = categories.map(category => category.id)

  // add existing features for every category
  features.categories = await categories.reduce(async (previous, category) => {
    const acc = await previous
    const productsRequest = await fetch(
      `https://products-api.dev.nobiadigital.com/${brand}/products?categories=${
        category.id
      }`
    )
    const { data: products } = await productsRequest.json()

    // get all _existing_ features for the category
    const categoryFeatures = Array.from(
      products.reduce(
        (set, product) =>
          Object.keys(product.features).reduce(
            (innerSet, feature) => innerSet.add(feature),
            set
          ),
        new Set()
      )
    )

    acc[category.id] = {
      ...acc[category.id],
      features: categoryFeatures,
    }

    return acc
  }, Promise.resolve(features.categories))

  // remove non-existing categories
  Object.keys(features.categories).forEach(featureCategory => {
    if (!categoryIds.includes(featureCategory)) {
      delete features.categories[featureCategory]
    }
  })

  // get a list of all unique features
  const allFeatures = Array.from(
    Object.values(features.categories).reduce(
      (acc, category) =>
        category.features.reduce((innerAcc, feature) => {
          innerAcc.add(feature)
          return innerAcc
        }, acc),
      new Set()
    )
  )

  // get a list of all feature messages
  const featureMessages = Object.keys(messages)
    .filter(message => message.startsWith(MESSAGE_PREFIX))
    .map(message => message.replace(MESSAGE_PREFIX, ''))

  // find features missing in feature messages
  const missingMessages = allFeatures.filter(
    feature => !featureMessages.includes(feature)
  )

  if (missingMessages.length > 0) {
    console.warn('Missing messages:')
    missingMessages.forEach(message => console.warn(`- ${message}`))
    console.log()
  }

  // find feature messages missing in features
  const unusedMessages = featureMessages.filter(
    feature => !allFeatures.includes(feature)
  )

  if (unusedMessages.length > 0) {
    console.warn('Unused messages:')
    unusedMessages.forEach(message => console.warn(`- ${message}`))
    console.log()
  }

  await writeFile(
    featuresPath,
    prettier.format(`module.exports = ${JSON.stringify(features, null, 2)}`, {
      filepath: featuresPath,
    })
  )

  console.log(
    `Features saved to '${path.relative(process.cwd(), featuresPath)}'`
  )
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
