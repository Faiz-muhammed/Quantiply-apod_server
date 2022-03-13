var db = require("../config/connection");
var collection = require("../config/collection");

module.exports = {
    
  getApod_FromDB: async (currentDate) => {
    try {
      let apodDetails = await db
        .get()
        .collection(collection.APOD_COLLECTION)
        .findOne({ date: currentDate });
      return apodDetails;
    } catch (err) {
      console.error("Error occured while searching data in db");
    }
  },

  insertApod: async (data) => {
    try {
      let insertedDoc = await db
        .get()
        .collection(collection.APOD_COLLECTION)
        .insertOne(data);
      return insertedDoc;
    } catch (err) {
      console.error("Error occured while inserting data into db");
    }
  },
};
