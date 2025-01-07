const path = require('path')

module.exports = {
  mode: 'development',
  entry: './javascript/applications.js',
  output: {
    path: path.resolve(__dirname, 'pages'),
    filename: 'applications-bundle.js'
  },
  watch: true
}




 







