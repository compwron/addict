module.exports = args => {
  let config;

  try {
    config = require('../config.json');
  } catch (e) {
    config = {};
  }

  config.user = process.env.ADDICT_USER || config.user;
  config.pass = process.env.ADDICT_PASS || config.pass;
  config.url = process.env.ADDICT_URL || config.url;
  config.port = process.env.PORT || config.port;

  config.user = args.options.user || config.user;
  config.pass = args.options.pass || config.pass;
  config.url = args.options.url || config.url;
  config.port = args.options.port || config.port;

  const missing = [];
  if (!config.user) {
    missing.push('user');
  }
  if (!config.user) {
    missing.push('pass');
  }
  if (!config.user) {
    missing.push('url');
  }

  if (missing.length > 0) {
    throw new Error(`No ${missing.join(', ')} specified in config.`);
  }

  return config;
};
