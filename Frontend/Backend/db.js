//CONNECTING WITH DATABASE(MONGODB)
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"


//Async function

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to MongoDb successfully..");
    })
}
module.exports = connectToMongo;