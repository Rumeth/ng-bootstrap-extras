// extracts only the minor version from package.json
// ex. "bootstrap": "4.0.1" -> "4.0"
let bootstrap: string = require('../../../package.json').devDependencies['bootstrap'];
bootstrap = bootstrap.substr(0, bootstrap.lastIndexOf('.'));

let ngBootstrap: string = require('../../../package.json').devDependencies['@ng-bootstrap/ng-bootstrap'];
ngBootstrap = ngBootstrap.substr(0, ngBootstrap.lastIndexOf('.'));

const ngBootstrapExtras = require('../../../src/package.json').version;

export const versions: {[key: string]: string} = { bootstrap, ngBootstrap, ngBootstrapExtras };
