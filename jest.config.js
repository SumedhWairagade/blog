module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest.assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/jest.assetsTransformer.js',
  },
  verbose: true,
  testURL: 'http://localhost:3000/',
};
