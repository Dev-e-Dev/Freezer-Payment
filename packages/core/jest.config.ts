export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/.*/index.ts', // Ignorar todos os arquivos index.ts em qualquer subdiretório de src
    '/src/index.ts',
  ],
}