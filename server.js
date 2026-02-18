const app = require('./src/app')

require("dotenv").config()

const connectToDb = require('./src/config/db');

connectToDb();

app.listen(3000,() => {
    console.log("server is started at port  3000"); 
}) 
