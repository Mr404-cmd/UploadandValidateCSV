const mysql = require('mysql');

// const dbConnect = async () => {
//     try {
        const dbConnect = mysql.createConnection({
            host: process.env.HOST,
            user: "root",
            password: "Root@123",
            database:"shubham_demo"
          });
          dbConnect.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
          });
//     } catch (e) {
//       console.log(`Error connecting to mongo database ${e}`);
//     }
//   };
  module.exports = dbConnect