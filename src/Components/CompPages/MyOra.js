// myscript.js
// This example uses Node 8's async/await syntax.
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const open = require('open');

const app = express();



var oracledb = require('oracledb');

var mypw = 'Gfhec1'  // set mypw to the hr schema password

const blobOutFileName = 'lobselectout.adm';  // file to write the BLOB to
// force all queried BLOBs to be returned as Buffers
oracledb.fetchAsBuffer = [ oracledb.BLOB ];

app.use(cors());

app.get('/',(req,res)=>{
  res.send('hello from the product server')
});

app.get('/draft',(req)=>{
//read blob
async function run(req) {
  const nMATRES = req.query.nMATRES;
  const sCODE = req.query.sCODE;
  let connection;
  try {
    connection = await oracledb.getConnection({
      user          : "parus",
      password      : "Gfhec1",
      connectString : "91.144.170.206:2085/parus"
    });

    let result;

    // Fetch a BLOB
    result = await connection.execute(
      `select FL.BDATA
from FILELINKSUNITS FLU, FILELINKS FL
where FLU.TABLE_PRN= :nMATRES
and FLU.UNITCODE='CostMaterialResources'
and FLU.FILELINKS_PRN=FL.RN
and FL.LOAD_DATE=(select max(FL1.LOAD_DATE) from FILELINKSUNITS FLU1, FILELINKS FL1
                      where FLU1.TABLE_PRN=FLU.TABLE_PRN
                        and FLU1.UNITCODE='CostMaterialResources'
                        and FLU1.FILELINKS_PRN=FL1.RN
                        and FL1.FILE_TYPE=16147152) `,
      [nMATRES]
      // An alternative to oracledb.fetchAsBuffer is to use fetchInfo on the column:
      // , { fetchInfo: {"B": {type: oracledb.BUFFER}} }
    );

    if (result.rows.length === 0)
      throw new Error("No results.  Did you run "+sCODE+".adm ( id="+nMATRES+") ?");

    const blob = result.rows[0][0];
    console.log('Writing BLOB to lobselectout.adm');
    fs.writeFileSync(sCODE+'.adm', blob);
    console.log('после записи BLOB to lobselectout.adm');

    //return res.send('success write');

    try {
    await  open(sCODE+'.adm', {wait: false});
    } catch (err) {
    console.log('The file viewer app quit');
    //return res.send('success open');
    }

  } catch (err) {
    console.error(err);
    //return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      //  return res.send(err.message);
      }
    }
  }

}
async function openFile(req){
  const sCODE = req.query.sCODE;
      try {
      await  open(sCODE+'.adm', {wait: false});
  } catch (err) {
  console.log('The file viewer app quit');
  //return res.send('success open');
}
}
run(req);
//openFile(req);
});

app.get('/completeproc',(req,res)=>{
  async function run(req, res) {
    const sCODE = req.query.sCODE;//'ТГ23-010-000-03'//
    const nCOMPANY = 16122680;//Теплогаз

    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : "parus",
        password      : "Gfhec1",
        connectString : "91.144.170.206:2085/parus"
      });

      let result = await connection.execute(
        `begin PARUS.USR_FCMATRESOURCEPRDSTR_CREATE(:nCOMPANY, :sCODE); end;`,
        [nCOMPANY, sCODE],  // bind value for :id
        {autoCommit:  true, outFormat: oracledb.OBJECT },
      );
      let result1 = await connection.execute(
              `select
              id "id" ,
              parentId "parentId" ,SNUMB,
              SCODE,
              SNAME,
              SPROD_KIND, NQUANT, SROUTE, SRES_SIGN, NMTR_RES, NMATERIAL_SIGN
              from USR_V_FCMATRESOURCEPRDSTR order by parentId, SNUMB`,[],
              { outFormat: oracledb.OBJECT },
            );

      //return res.send('success');
      return res.json(result1.rows);


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


app.get('/complete',(req,res)=>{
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
        `select 'Состав для '||trim(V.SNAME) sINFO
          from V_FCMATRESOURCE V
          where V.NCOMPANY=16122680
            and trim(v.scode) = :sBARCODE`,
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


app.get('/inorders',(req,res)=>{
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
        `select v.nrn,trim(v.sindoctype) sindoctype, trim(v.sindocpref) sindocpref,
                trim(v.sindocnumb) sindocnumb, to_char(v.dindocdate,'dd.mm.yyyy') dindocdate
            from v_inorders v
              where trim(v.sbarcode) = :sBARCODE`,
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
