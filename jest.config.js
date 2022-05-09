export default {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.mjs',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: ['js', 'mjs'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.mjs$',
  transform: {
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
