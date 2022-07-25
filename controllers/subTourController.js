//const Stock = require('./../models/stockModel');
const yellowTaxiData = require("../resources/yellow_taxi.json");

exports.getAllOptions = async (req, res) => {
  try {
    return res.status(200).json({
      data: {
        items: [
          {
            borough: "Manhattan",
            subBoroughs: ["Manhattan_South", "Manhattan_North"],
          },
          {
            borough: "Bronx",
            subBoroughs: ["Bronx_North", "Bronx_East", "Bronx_West"],
          },
          {
            borough: "Queens",
            subBoroughs: ["Queens_Central", "Queens_North", "Queens_South"],
          },
          {
            borough: "Staten_Island",
            subBoroughs: ["Staaten_Island_North", "Staaten_Island_South"],
          },
          {
            borough: "Brooklyn",
            subBoroughs: ["Brooklyn_East", "Brooklyn_North", "Brooklyn_West"],
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
  let subDistrict = req.params.subDistrict;
  subDistrict = capitalizeFirstLetter(subDistrict);
  subDistrict = capitalizeAfterUnderscore(subDistrict);

  let filteredJson = yellowTaxiData.filter((t) => t.sub_borough === subDistrict);
  sendingData(filteredJson, true);
  try {
    return res.status(200).json({
      message: `Sending data for ${subDistrict}. To stop this process send a PUT request`,
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

/**
 * MQTT connection and send to client
 */
let repeats = false;
sendingData = function (jsonData, repeatsNew) {
  const mqtt = require("mqtt");

  const options = {
    keepalive: 30,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: "mqtt",
      payload: "Connection Closed abnormally..!",
      qos: 2,
      retain: true,
    },
    rejectUnauthorized: false,
  };

  const connectUrl = "ws://127.0.0.1:9001/mqtt";
  const client = mqtt.connect(connectUrl, options);

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

/**
 * String manipulation
 * @param {Districts} string
 * @returns
 */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeAfterUnderscore(string) {
  var i,
    frags = string.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    console.log(frags[i]);
  }
  frags[0] = frags[0] + "_";
  console.log(frags[0]);
  frags = frags[0] + frags[1];
  console.log(frags);
  return frags;
}
