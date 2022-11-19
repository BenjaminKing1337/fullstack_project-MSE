
  let knex = require('knex')({
    client: 'mssql',
    connection: {
      server: 'localhost',
      user: 'sa',
      password: '',
      options: {
        trustedConnection: true,
        instanceName: 'SQLEXPRESS' 
      },
      database: 'mseDB',
    },
  });

  module.exports = knex;
 

