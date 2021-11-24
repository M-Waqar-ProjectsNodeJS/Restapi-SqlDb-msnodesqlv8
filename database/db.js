const sql = require("mssql/msnodesqlv8");

const config = {
  database: "RazorBookList",
  server: "DESKTOP-MVM5OV9\\MYSQLEXPRESS2014",
  driver: "msnodesqlv8",
  user: "sa",
  password: "Mw2018dxb$_sql",
  options: {
    //trustedConnection: true, // For Windows authentication
  },
};
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise,
};
