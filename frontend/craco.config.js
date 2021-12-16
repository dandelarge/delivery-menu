const ESLintPlugin = require('eslint-webpack-plugin');
const fs = require('fs');

module.exports = {
  plugins: [
  {
    plugin: {
      overrideWebpackConfig: ({ webpackConfig }) => {
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => !(plugin.options && 'eslintPath' in plugin.options)
        );

        webpackConfig.plugins.unshift(new ESLintPlugin({
          // Plugin options
          extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),
          context: './src',
          cache: true,

          // Setting threads to false boost compiling speed back to previous levels
          threads: false,

          // ESLint class options
          cwd: fs.realpathSync(process.cwd()),
          resolvePluginsRelativeTo: __dirname,
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app/base')],
            rules: {
              'react/react-in-jsx-scope': 'error',
            },
          },
        }));

        return webpackConfig;
      }
    }
  }
]
};