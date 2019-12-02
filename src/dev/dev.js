const YAML = require('js-yaml')
const fs  = require('fs')

try {
  var doc = YAML.safeLoad(fs.readFileSync('./config.yml'), 'utf8');
  console.log(doc);
} catch (e) {
  console.log(e);
}