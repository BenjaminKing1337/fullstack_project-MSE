// require('mssql');

var knex = require('./dbknex');

  
  knex
    .select('*')
    .from('tblProperty')
    .then(function (properties) {
      properties.forEach(function (property) {
        console.log(property);
      });
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      knex.destroy();
    });