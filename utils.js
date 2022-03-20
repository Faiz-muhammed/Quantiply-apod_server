const axios = require("axios");
const fs = require("fs");
const request = require("request");


module.exports = {

  nasa_apod: () => { 
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_API_KEY}`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject("error in nasa api call");
        });
    });
  },

  nasa_apod_selectedDate: (pickedDate) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_API_KEY}&date=${pickedDate}`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject("error in nasa api call");
        });
    });
  },

  download_Image: (url, img_path, callBack) => {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(img_path)).on("close", callBack);
    });
  },
};
