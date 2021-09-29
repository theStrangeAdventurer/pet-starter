const fs = require('fs');
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const result = `/* Do not change this file, it is generated automatically */
db.createUser({
  user: "${process.env.DB_USER}",
  pwd: "${process.env.DB_PASSWORD}",
  roles: [
    {
      role: "readWrite",
      db: "${process.env.DB_NAME}"
    }
  ]
});
`;
const savePath = path.resolve(__dirname, '..', 'mongo', 'init-mongo.js');
fs.writeFileSync(savePath, result);
console.log(' init-mongo.js was created...');