const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const domainName = process.env.DOMAIN;
const nginxProdConf = path.resolve(__dirname, '..', 'nginx', 'conf.d.production', 'vhost.conf');

let ngixnConfStr = fs.readFileSync(nginxProdConf).toString();
const REPLACE_PART = 'ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;';
let redirectPart = `
  if ($server_port = 80) { set $https_redirect 1; }
  if ($host ~ '^www\.') { set $https_redirect 1; }
  if ($https_redirect = 1) { return 301 https://${domainName}$request_uri; }
`;

console.log(`Adding a 301 redirect to 443 port and non www host`);
ngixnConfStr = ngixnConfStr.replace(REPLACE_PART, REPLACE_PART + redirectPart);
fs.readFileSync(nginxProdConf, ngixnConfStr);
console.log(`301 redirect added...`);