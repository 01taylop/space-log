import { spawn } from 'node:child_process'
import { cwd } from 'node:process'

import chalk from 'chalk'

const packageRoot = cwd()

describe('integration tests', () => {

  const config = JSON.stringify({
    columnKeys: ['country', 'capital', 'flag'],
    headings: ['Country', 'Capital City', 'Flag'],
  })

  const testData = JSON.stringify([
    { country: 'Brazil', capital: 'Brasília', flag: '🇧🇷',  },
    { country: 'Japan', capital: 'Tokyo', flag: '🇯🇵',  },
    { country: 'South Korea', capital: 'Seoul', flag: '🇰🇷',  },
    { country: 'United Kingdom', capital: 'London', flag: '🇬🇧',  },
  ])

  const expectedResult = `
${chalk.underline('Country')}        ${chalk.underline('Capital City')} ${chalk.underline('Flag')}
Brazil         Brasília     🇧🇷
Japan          Tokyo        🇯🇵
South Korea    Seoul        🇰🇷
United Kingdom London       🇬🇧
\n`

  const runNodeScript = (script: string, type: 'module' | 'commonjs' = 'module'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const args = type === 'module'
        ? ['--input-type=module', '--eval', script]
        : ['--eval', script]

      const child = spawn('node', args, {
        cwd: packageRoot,
        env: process.env,
        stdio: 'pipe',
      })

      let stdout = ''
      let stderr = ''

      child.stdout.on('data', data => stdout += data.toString())
      child.stderr.on('data', data => stderr += data.toString())

      child.on('close', code => {
        if (stderr.length > 0) {
          reject(new Error(`Test failed with stderr: ${stderr}`))
        } else if (code === 0) {
          resolve(stdout)
        } else {
          reject(new Error(`Test failed. Code: ${code}`))
        }
      })
    })
  }

  describe('CommonJS', () => {

    test('default import from lib/index.cjs', async () => {
      expect.assertions(1)

      const script = `
        const spaceLog = require('./lib/index.cjs').default

        spaceLog(${config}, ${testData})
      `

      const output = await runNodeScript(script, 'commonjs')
      expect(output).toStrictEqual(expectedResult)
    })

    test('named import from lib/index.cjs', async () => {
      expect.assertions(1)

      const script = `
        const { spaceLog } = require('./lib/index.cjs')

        spaceLog(${config}, ${testData})
      `

      const output = await runNodeScript(script, 'commonjs')
      expect(output).toStrictEqual(expectedResult)
    })

  })

  describe('ESM', () => {

    test('default import from lib/index.js', async () => {
      expect.assertions(1)

      const script = `
        import spaceLog from './lib/index.js'

        spaceLog(${config}, ${testData})
      `

      const output = await runNodeScript(script, 'module')
      expect(output).toStrictEqual(expectedResult)
    })

    test('named import from lib/index.js', async () => {
      expect.assertions(1)

      const script = `
        import { spaceLog } from './lib/index.js'

        spaceLog(${config}, ${testData})
      `

      const output = await runNodeScript(script, 'module')
      expect(output).toStrictEqual(expectedResult)
    })

  })

})
