import baseConfig from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    livereload({
      watch: 'examples/brower'
    }),
    serve({
      port: 8080,
      contentBase: ['dist', 'examples/brower'],
      openPage: 'index.html'
    })
  ]
};
