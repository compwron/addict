const AD = require('ad');
const express = require('express');
const bodyParser = require('body-parser');
const swagpi = require('swagpi');
const vorpal = require('vorpal')();

const swagpiConfig = require('./src/swagpi.config.js');
const loadConfig = require('./src/loadConfig');
const routes = require('./src/routes');
const commands = require('./src/commands');
const middleware = require('./middleware');
const chalk = vorpal.chalk;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
middleware.call(app);

swagpi(app, {
  logo: './src/img/logo.png',
  config: swagpiConfig
});

const init = args => {
  try {
    const config = loadConfig(args);
    const ad = new AD(config).cache(true);
    app.listen(config.port || 3000);
    routes(app, config, ad);
    vorpal.use(commands, { ad });
    vorpal.log(
      `Addict Active Directory API\nListening on port ${config.port || 3000}`
    );
  } catch (err) {
    vorpal.log(err.message);
    process.exit();
  }
};

vorpal
  .command('_start')
  .hidden()
  .option('-u, --user [user]', 'Domain admin username.')
  .option('-p, --pass [pass]', 'Domain admin password.')
  .option('--url [url]', 'URL for Active Directory.')
  .option('--port [port]', 'Port to listen on.')
  .action(function(args, cbk) {
    init(args);
    cbk();
  });

vorpal.exec(`_start ${process.argv.slice(2).join(' ')}`);
vorpal.delimiter(chalk.cyan('Addict:')).show();
