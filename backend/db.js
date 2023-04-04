const mongoose = require('mongoose')
const Mongourl = require('./.env')
mongoose.set("strictQuery", false);


const mongoURI = Mongourl.MONGO_URL
const server = "127.0.0.1:27017"
const database ="local"

const connecttoMongo = async ()=>{
   await mongoose.connect(`mongodb://${server}/${database}`)
   console.log("Connect Mongodb Successfully")
}

module.exports = connecttoMongo