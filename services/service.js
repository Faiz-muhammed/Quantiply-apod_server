var db = require("../config/connection");
var collection = require("../config/collection");

module.exports ={
    getApod_FromDB:async(currentDate)=>{
     let apodDetails=await db.get().collection(collection.APOD_COLLECTION).findOne({date:currentDate})
     return apodDetails

    },
    insertApod:async(data)=>{
     let insertedDoc=await db.get().collection(collection.APOD_COLLECTION).insertOne(data)
     return insertedDoc
    }
};