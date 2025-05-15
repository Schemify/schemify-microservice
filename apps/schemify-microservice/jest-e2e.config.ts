import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  displayName: 'schemify-microservice',
  rootDir: './test',
  testRegex: '.e2e-spec.ts$',
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testTimeout: 10_000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}

export default config
