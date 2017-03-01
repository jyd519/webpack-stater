//webpack.config.js
//
function buildConfig(env) {
  const name = env || 'dev';
  return require('./config/webpack.' + name + '.js')(env);
}

module.exports = buildConfig;
