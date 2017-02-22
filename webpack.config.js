
function buildConfig(env) {
  const name = env || 'dev';
  return require('./webpack.' + name + '.js')({ env: env });
}

module.exports = buildConfig;
