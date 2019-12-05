// myscript.js
// This example uses Node 8's async/await syntax.
const express = require('express');
const cors = require('cors');

const app = express();



var oracledb = require('oracledb');

var mypw = 'Gfhec1'  // set mypw to the hr schema password

app.use(cors());

app.get('/',(req,res)=>{
  res.send('hello from the product server')
});

app.get('/inorderspecs',(req,res)=>{
  async function run(req, res) {
    const sBARCODE = req.query.sBARCODE;
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : "parus",
        password      : "Gfhec1",
        connectString : "91.144.170.206:2085/parus"
      });

      let result = await connection.execute(
        `select
            spec.nrn, spec.snomenname, spec.snomen,head.party_code sparty,
            spec.nfactquant,spec.nprice,spec.smeas_main
            from inorders head,v_inorderspecs spec
            where spec.nprn=head.rn
              and trim(head.barcode) = :sBARCODE`,
        [sBARCODE],  // bind value for :id 16143476
        { outFormat: oracledb.OBJECT },
      );
      return res.json(result.rows);


    } catch (err) {
      return res.send(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          return res.send(err);
        }
      }
    }
  }
  run(req, res);
});

app.get('/locate',(req,res)=>{
  async function run(req, res) {
    const nSLAVERN = req.query.nSLAVERN;
    const sRACK = req.query.sRACK;
    const nQUANT = req.query.nQUANT;

    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : "parus",
        password      : "Gfhec1",
        connectString : "91.144.170.206:2085/parus"
      });

      let result = await connection.execute(
        `begin PARUS.USR_STRPLRESJRNL_INSERT_WEB(:nSLAVERN, :sRACK, :nQUANT); end;`,
        [nSLAVERN, sRACK, nQUANT],  // bind value for :id
        {autoCommit:  true, outFormat: oracledb.OBJECT },
      );
      return res.send('success');
      return res.json(result.rows);


    } catch (err) {
      return res.send(err.message);
      console.error(err.message);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          return res.send(err.message);
          console.error(err.message);
        }
      }
    }
  }
  run(req, res);
});

app.listen(4000,()=>{
  console.log('Product server listening on port 4000');
});
