import sql from 'mssql'
import dotenv from 'dotenv'
 
dotenv.config();
 
const {SQL_USER,SQL_PASSWORD,SQL_DB,SQL_SERVER,SQL_ENCRYPT,SQL_TRUST_SERVER_CERTIFICATE}=process.env
 
const sqlConfig={
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DB,
    server: SQL_SERVER,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis: 30000
       
    },
    options: {
            encrypt: Boolean(SQL_ENCRYPT),
            trustServerCertificate: Boolean(SQL_TRUST_SERVER_CERTIFICATE)
          }
   
}
 
 
let appPool;
let poolRequest;
 
try {
  appPool = await sql.connect(sqlConfig);
  poolRequest = () => appPool.request();
  if (appPool) {
    console.log('Connected to SQL server');
  }
} catch (error) {
  console.log('Error', error.message);
}
 
const closePool = async () => sql.close();
 
export { poolRequest,closePool,sql };
 
 
 
