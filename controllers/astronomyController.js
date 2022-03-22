const {
  nasa_apod_selectedDate,
  download_Image,
  nasa_apod,
} = require("../utils");
const { getApod_FromDB, insertApod } = require("../services/service");

module.exports = {
  // Getting Astronomy picture of the current day
  getApod: async (req, res) => {
    let currentDate=new Date().toISOString().slice(0, 10)
    let date = req.params.pickedDate || currentDate ;
    try{

    if(date>currentDate){
      console.log("pick late lesser than",currentDate)
      return res.status(400).json({message:`Pick a date lesser than or equal to ${currentDate}`})
    }

    let apodData = await getApod_FromDB(date); //  Getting Astronomy details from database
    
    if (apodData) {
      apodData.url = `${process.env.DOMAIN_NAME}/apod_img/${apodData._id}.jpg`;
      return res.status(200).json({ data: apodData });
    } else {
      nasa_apod_selectedDate(date) // Making request to nasa apod open api for current day apod
        .then(async (response) => {
          let insertId = await insertApod(response); // inserting Astronomy informations to database
          if (response.media_type === "image") {
            download_Image(            // downloading image from nasa api response info
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
          console.error(error);
          return res.status(500).json({message:"Apologies,The fault is from our side"})
        });
    }
  }catch(err){
    return res.status(500).json({message:"Apologies,The fault is from our side"})
  }
  },
};
