module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          browsers: ["> 1%", "last 2 versions", "not ie <= 9"]
        }
      }
    ]
  ],

}
