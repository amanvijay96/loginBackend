const { users } = require('./models/users');

async function createTable() {
  await users.sync({ force: true });
}

createTable();
