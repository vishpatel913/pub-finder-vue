module.exports = {
  testMatch: ["**/*.(test|spec).(js|jsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/__utils"],
  transform: {
    "^.+\\.js$": "babel-jest"
  }
  // transformIgnorePatterns: ["/node_modules/(?!test-component).+\\.js$"]
};
