
function buildConfig(env) {
  const name = env || 'dev';
  return require('./config/webpack.' + name + '.js')({ env: env });
}

module.exports = buildConfig;
