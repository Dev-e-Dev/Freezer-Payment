export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!src/shared/constants/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/.*/index.ts', // Ignorar todos os arquivos index.ts em qualquer subdiretório de src
    '/src/index.ts',
  ],
}