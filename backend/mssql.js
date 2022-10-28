const sql = require("mssql");

const config = {
    server: "localhost\\SQLEXPRESS",
    port: 1433,
    user: "sa",
    password:"",
    database:"mseDB",
    options: {
        enableArithAbort: true,
    },
    connectionTimeout: 150000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    encrypt: false
};

sql.on('error', err => {
    console.log(err.message)
})


//Async Wait

async function getDBPropertiesAsyncFunction() {
    try {
        let pool = await sql.connect(config);
        let result1 = await pool.request().query('select * from tblProperty');
        console.log(result1);
        sql.close();
    }
    catch (error) {
        console.log(err.message);
        sql.close();
    }
}

getDBPropertiesAsyncFunction();