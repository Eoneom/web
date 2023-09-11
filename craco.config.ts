import path from 'path'

module.exports = {
  webpack: {
    alias: {
      '#helpers': path.resolve(__dirname, 'src/helpers'),
      '#hook': path.resolve(__dirname, 'src/hook'),
      '#auth': path.resolve(__dirname, 'src/modules/auth'),
      '#building': path.resolve(__dirname, 'src/modules/building'),
      '#city': path.resolve(__dirname, 'src/modules/city'),
      '#cost': path.resolve(__dirname, 'src/modules/cost'),
      '#communication': path.resolve(__dirname, 'src/modules/communication'),
      '#map': path.resolve(__dirname, 'src/modules/map'),
      '#movement': path.resolve(__dirname, 'src/modules/movement'),
      '#requirement': path.resolve(__dirname, 'src/modules/requirement'),
      '#technology': path.resolve(__dirname, 'src/modules/technology'),
      '#troup': path.resolve(__dirname, 'src/modules/troup'),
      '#types': path.resolve(__dirname, 'src/types'),
      '#ui': path.resolve(__dirname, 'src/ui'),
    },
  },
}
