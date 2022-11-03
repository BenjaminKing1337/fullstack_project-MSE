const config = {
    server: "localhost\\SQLEXPRESS",
    port: 1433,
    user: "sa",
    password: "",
    database: "mseDB",
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    connectionTimeout: 150000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    encrypt: false,
  };

  module.exports = config;