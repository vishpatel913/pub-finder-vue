module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: ["**/*.(test|spec).(js|jsx)"],
  testPathIgnorePatterns: ["/node_modules/", "lib/"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testEnvironment: "node",
  rootDir: "src"
};
