var config = require('../dbconfig');
const sql = require('mssql');

const Express = require('express');
const router = Express.Router();
const Property = require('../classes/Property');

//GetALL
router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const Properties = await pool.request().execute('spGetAllProperties');
    res.json(Properties.recordsets[0]);
    sql.close();
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
});
//GetById
router.get('/get/:id', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const PropertyById = await pool
      .request()
      .input('id', sql.Int, parseInt(req.params.id))
      .execute('spGetProperty');
    res.json(PropertyById.recordset[0]);
    sql.close();
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
});
//CreateNew
router.post('/new', async (req, res) => {
  try {
    const NewProperty = new Property(
      undefined, // best way of handling this?
      req.body.number,
      req.body.address,
      req.body.name
    );
    console.log(NewProperty);
    let pool = await sql.connect(config);
    const SavedProperty = await pool
      .request()
      .input('number', sql.NVarChar, NewProperty.number)
      .input('address', sql.NVarChar, NewProperty.address)
      .input('name', sql.NVarChar, NewProperty.name)
      .query(
        'insert into tblProperty(number, address, name) values (@number,@address,@name)'
      );
    // let a = res.json(SavedProperty.recordsets);
    sql.close();
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
});

//Delete
router.post("/delete/:id", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const DeleteProperty = await pool
    .request()
    // .input("id", sql.Int, Property.id)
    .input("name", sql.Int, parseInt(req.params.id))
    .query("delete from tblProperty where id=@id");
    res.json(DeleteProperty.recordsets);
    sql.close();
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ error });
    sql.close();
  }
});

module.exports = router;
