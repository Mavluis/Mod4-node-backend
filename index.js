
'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routers = require('./webserver/routes');
const mysqlPool = require('./databases/mysql-pool');
const mongoPool = require('./databases/mongo-pool');

const app = express();
app.use(bodyParser.json());

app.use('/api', routers.accountRouter);
app.use('/api', routers.postRouter);
app.use('/api', routers.userRouter);

async function init() {
  try {
    await mysqlPool.connect();
    await mongoPool.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
  });
}

init();
