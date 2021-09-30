const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const DOMAIN_MASK = "#DOMAIN#";
const DOMAIN_EMAIL_MASK = "#DOMAIN_EMAIL#";

dotenv.config();

const domainName = process.env.DOMAIN;
const domainEmail = process.env.DOMAIN_EMAIL;
const nginxProdConf = path.resolve(__dirname, '..', 'nginx', 'conf.d.production', 'vhost.conf');
const initLetsEncryptScript = path.resolve(__dirname, '..', 'nginx', 'init-letsencrypt.sh');

let ngixnConfStr = fs.readFileSync(nginxProdConf).toString();
ngixnConfStr = ngixnConfStr.replace(new RegExp(DOMAIN_MASK, 'g'), domainName);
ngixnConfStr = ngixnConfStr.replace(new RegExp(DOMAIN_EMAIL_MASK, 'g'), domainEmail);

let initLEScriptStr = fs.readFileSync(initLetsEncryptScript).toString();
initLEScriptStr = initLEScriptStr.replace(new RegExp(DOMAIN_MASK, 'g'), domainName);
initLEScriptStr = initLEScriptStr.replace(new RegExp(DOMAIN_EMAIL_MASK, 'g'), domainEmail);

console.log(`👀 Changing in configs: \n\t#DOMAIN# -> ${domainName}\n\t#DOMAIN_EMAIL# -> ${domainEmail}`);
fs.writeFileSync(nginxProdConf, ngixnConfStr);
fs.writeFileSync(initLetsEncryptScript, initLEScriptStr);
console.log(`👀 Changing is competed!`);