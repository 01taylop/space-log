const semver = require('semver')

const { engines } = require('./package.json')

const nodeVersion = semver.minVersion(engines.node)?.version

if (!nodeVersion) {
  throw new Error(`Invalid or missing engines.node in package.json: ${engines.node}`)
}

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
    }],
  ],
  env: {
    cjs: {
      presets: [
        ['@babel/preset-env', {
          modules: 'commonjs',
          targets: { node: nodeVersion },
        }],
      ],
    },
    esm: {
      presets: [
        ['@babel/preset-env', {
          modules: false,
          targets: { node: nodeVersion },
        }],
      ],
    },
  },
}
