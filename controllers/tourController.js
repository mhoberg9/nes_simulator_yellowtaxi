//const Stock = require('./../models/stockModel');
const yellowTaxiData = require("../resources/yellow_taxi.json");

exports.getAllOptions = async (req, res) => {
  try {
    return res.status(200).json({
      data: {
        items: [
          {
            borough: "manhattan",
          },
          {
            borough: "bronx",
          },
          {
            borough: "queens",
          },
          {
            borough: "staten_Island",
          },
          {
            borough: "brookly",
          },
        ],
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getSpecificTour = async (req, res) => {
  let district = req.params.district;
  district = capitalizeFirstLetter(district);
//   let yellowTaxiJson= yellowTaxiData.results 
  let filteredJson = yellowTaxiData.filter(
    (t) => t.borough === district
  );
  sendingData(filteredJson, true);
  try {
    return res.status(200).json({
        message: `Sending data for ${district}. To stop this process send a PUT request to localhost:3000/api/v1/tours/`,

    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

exports.stopSendingData = async (req, res) => {
  sendingData({}, false);
  try {
    return res.status(200).json({
      data: {
        Status: "stopped",
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

let repeats = false;
sendingData = function (jsonData, repeatsNew) {

  const mqtt = require("mqtt")


const options = {
    keepalive: 30,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
        topic: 'mqtt',
        payload: 'Connection Closed abnormally..!',
        qos: 2,
        retain: true
    },
    rejectUnauthorized: false
}

  const connectUrl = 'ws://127.0.0.1:9001/mqtt'
  const client = mqtt.connect(connectUrl, options)

  let rnd = Math.floor(Math.random() * jsonData.length);
  client.publish("demoTownSensorData", JSON.stringify(jsonData[rnd]));
  console.log(`Sending ${JSON.stringify(jsonData[rnd])}`);

  repeats = repeatsNew;
  if (repeats === true) {
    setTimeout(() => {
      sendingData(jsonData, repeats);
    }, 2000);
  } else {
    return false;
  }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
