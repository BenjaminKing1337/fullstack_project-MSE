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


//Async await

async function getDBProperties() {
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

async function getDBProperty() {
    try {
        let pool = await sql.connect(config);
        let result1 = await pool
        .request()
        .input("id", sql.Int, 1)
        .query('select * from tblProperty where id = @id');
        let result2 = await pool
        .request()
        .input("id", sql.Int, 2)
        .execute('GetProperty');
        // .query('select * from tblProperty where id = @id');
        console.log(result1.recordset[0]);
        console.log(result2.recordset[0]);
        sql.close();
    }
    catch (error) {
        console.log(err.message);
        sql.close();
    }
}

//  getDBProperties();
//  getDBProperty();

// Promise

sql.connect(config).then(pool => {
    // return pool
    // .request()
    // .input("id", sql.Int, 3)
    // .query("select * from tblProperty where id = @id")
    return pool
    .request()
    .input("id", sql.Int, 3)
    .execute("GetProperty")
}).then(result => {
    console.log(result.recordset[0])
    sql.close();
}).catch(err => {
    console.log(err.message);
    sql.close();
})