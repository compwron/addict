// Toying with a CLI for this app.
// Here's one command. :)

let chalk;

const formatJSON = json => {
  let out = [''];
  json = Array.isArray(json) ? json : [json];
  let divider = json.length > 1 ? '  ---------------------' : undefined;
  json.forEach(obj => {
    for (const item in obj) {
      if (typeof obj[item] === 'string') {
        out.push(`  ${chalk.yellow(item)}: ${obj[item]}`);
      }
    }
    if (divider) {
      out.push(divider);
    }
  });
  out.push('');
  return out.join('\n');
};

module.exports = function(vorpal, { ad }) {
  chalk = vorpal.chalk;
  vorpal.command('user <user>').action(function(args, cb) {
    return ad
      .user(args.user)
      .get()
      .then(user => {
        return this.log(formatJSON(user));
      })
      .catch(err => {
        this.log(err);
      });
  });
};
