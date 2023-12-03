
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString,{dbName:'hireUp_users'}).then(()=>{
    
    console.log("Mongoose connected");
}).catch((err)=>{
    console.log(`Mongoose Connection failed Error: ${err}`);
})
