module.exports = {
  presets: ['@vue/cli-plugin-unit-jest'],
  modulePathIgnorePatterns: ['<rootDir>/functions/', '<rootDir>/node_modules/'],
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)(\\?inline)?$': 'jest-transform-stub',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};
