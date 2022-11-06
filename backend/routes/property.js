var config = require("../dbconfig");
const sql = require("mssql");

const Express = require("express");
const router = Express.Router();
const Property = require("../classes/Property");

//GetALL
router.get("/", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const Properties = await pool.request().execute("spGetAllProperties");
    res.json(Properties.recordsets[0]);
    sql.close();
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
});
//GetById
router.get("/get/:id", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const Property = await pool
      .request()
      .input("id", sql.Int, parseInt(req.params.id))
      .execute("spGetProperty");
    res.json(Property.recordset[0]);
    sql.close();
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
});
//CreateNew
router.post("/new", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const NewProperty = await pool
    .request()
    // .input('id', sql.Int, property.id)
    .input('number', sql.NVarChar, property.number)
    .input('address', sql.NVarChar, property.address)
    .input('name', sql.NVarChar, property.name)
    .query("insert into tblProperty");
    res.json(NewProperty.recordsets[0]);
    sql.close();
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
})

module.exports = router;
