module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ["/node_modules/(?!vue-awesome)"],
  transform: {
    '^.+\\.vue$': 'vue3-jest'
  },
  "moduleNameMapper": {
      "axios": "axios/dist/node/axios.cjs"
    }
}