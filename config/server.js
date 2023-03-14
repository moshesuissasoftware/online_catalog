const authMiddleware = require('@nobia/auth-express-middleware')
const { backendEnv } = require('./baseSettings')

const baseConfig = {
  logger: false,
  setup: app => {
    app.use(
      authMiddleware({
        urls: {
          afterLogin: '/',
          afterLogout: '/',
        },
      })
    )
  },
}

const server = {
  _local: {
    ...baseConfig,
    logger: true,
  },
  dev: {
    ...baseConfig,
  },
  test: {
    ...baseConfig,
  },
  stage: {
    ...baseConfig,
  },
  prod: {
    ...baseConfig,
  },
}

module.exports = server[backendEnv]
