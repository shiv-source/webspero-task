
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async() => {
    try{

        await mongoose.connect( process.env.MONGODB_URL , {
            useCreateIndex : true,
            useFindAndModify : true,
            useNewUrlParser : true,
            useUnifiedTopology : true
        }).then( () => console.log("Database is connected successfully"));
    }

    catch(err){
        console.log(err);

    }
}

module.exports = dbConnection();