import path from 'path'

module.exports = {
  webpack: {
    alias: {
      '#auth': path.resolve(__dirname, 'src/modules/auth'),
      '#building': path.resolve(__dirname, 'src/modules/building'),
      '#city': path.resolve(__dirname, 'src/modules/city'),
      '#requirement': path.resolve(__dirname, 'src/modules/requirement'),
      '#technology': path.resolve(__dirname, 'src/modules/technology'),
      '#map': path.resolve(__dirname, 'src/modules/map'),
      '#helpers': path.resolve(__dirname, 'src/helpers'),
      '#shared': path.resolve(__dirname, 'src/shared'),
    },
  },
}
