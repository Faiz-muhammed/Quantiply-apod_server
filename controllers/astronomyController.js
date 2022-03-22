const { nasa_apod_selectedDate, download_Image,nasa_apod } = require("../utils");
const { getApod_FromDB, insertApod } = require("../services/service");

module.exports = {

  // Getting Astronomy picture of the current day 
  getApod: async (req, res) => {
  
    const currentDay = new Date().toISOString().slice(0, 10);
    let apodData = await getApod_FromDB(currentDay);   //  Getting Astronomy details from database

    if (apodData) {
    
      apodData.url = `${process.env.DOMAIN_NAME}/apod_img/${apodData._id}.jpg`;
      return res.status(200).json({ data: apodData });
    } else {

      nasa_apod()       // Making request to nasa apod open api for current day apod
        .then(async (response) => {
          let insertId = await insertApod(response); // inserting Astronomy informations to database
          if (response.media_type === "image") {

            download_Image(                 // downloading image from nasa api response info
              response.url,
              `./public/apod_img/${insertId.insertedId}.jpg`,
              () => {
                console.log("downloaded image");
              }
            );
          }
          return res.status(200).json({ data: response });
        })
        .catch((error) => {
          console.error(error)
        });
    }
  },

  // Getting astronomy picture of selected date
  getApodById: async (req, res) => {
    let pickedDate = req.params.pickedDate;
    let apodData = await getApod_FromDB(pickedDate);   //  Getting Astronomy details from database

    if(!pickedDate){
      res.status(400).json({message:"Required input is missing"})
    }

    else if (apodData) {
      apodData.url = `${process.env.DOMAIN_NAME}/apod_img/${apodData._id}.jpg`;
      return res.status(200).json({ data: apodData });
    } else {

      nasa_apod_selectedDate(pickedDate)    // Making request to nasa apod open api to get selected date apod 
        .then(async (response) => {
          let insertId = await insertApod(response);  // inserting Astronomy informations to database
          if (response.media_type === "image") {

            download_Image(                           //downloading image from nasa api response info
              response.url,
              `./public/apod_img/${insertId.insertedId}.jpg`,
              () => {
                console.log("dowloaded selected date image");
              }
            );
          }
          return res.status(200).json({ data: response });   
        })
        .catch((error) => {
          console.error(error)
        });
    }
  },
};
