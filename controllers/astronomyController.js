const { nasa_apod_selectedDate, download_Image } = require("../utils");
const { getApod_FromDB, insertApod } = require("../services/service");

module.exports = {
  getApod: async (req, res) => {
    let currentDay = new Date().toISOString().slice(0, 10);
    let apodData = await getApod_FromDB(currentDay);
    if (apodData) {
      return res.status(200).json({ data: apodData });
    } else {
      nasa_apod()
        .then(async (response) => {
          let insertId = await insertApod(response);
          if (response.media_type === "image") {
            download_Image(
              response.url,
              `./public/apod_img/${insertId.insertedId}.jpg`,
              () => {
                console.log("dowloaded image");
              }
            );
          }
          return res.status(200).json({ data: response });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  getApodById: async (req, res) => {
    let pickedDate = req.params.pickedDate;
    let apodData = await getApod_FromDB(pickedDate);
    if (apodData) {
      return res.status(200).json({ data: apodData });
    } else {
      nasa_apod_selectedDate(pickedDate).then(async (response) => {
        let insertId = await insertApod(response);
        if (response.media_type === "image") {
          download_Image(
            response.url,
            `./public/apod_img/${insertId.insertedId}.jpg`,
            () => {
              console.log("dowloaded selected date image");
            }
          );
        }

        return res.status(200).json({ data: response });
      });
    }
  },
};
