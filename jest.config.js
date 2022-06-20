module.exports = {
  //testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  testMatch: ["**/__tests__/(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "\\.jsx?$": "babel-jest",
  },
  preset: "ts-jest/presets/js-with-babel",
  transformIgnorePatterns: ["/node_modules/(?!dot-prop)/"],
};
