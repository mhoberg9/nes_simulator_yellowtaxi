const yellowTaxiData = require("../resources/yellow_taxi.json");
const sampleJson_1 = require("../resources/topologyBuilder_1");

exports.getTaxiRoutes = async (req, res) => {
    let data = jsonBuilder();
    console.log(JSON.stringify(data));

    try {
        return res.status(200).json({
            data,jsonBuilder
        });
    } catch (e) {
        res.status(404).json({
            status: "fail", message: e,
        });
    }
};

exports.getCpuInfo = () => {
    let percentage = [20, 24, 25, 20, 24, 25, 21, 26, 23, 24];
    let rnd = Math.floor(Math.random() * percentage.length);
    return percentage[rnd];
};

exports.getMemoryInfo = () => {
    let percentage = [80, 85, 80, 78, 50, 75, 70, 65, 70];
    let rnd = Math.floor(Math.random() * percentage.length);
    return percentage[rnd];
};

exports.getNetworkInfo = () => {
    let percentage = [2, 1, 2, 2, 1, 2, 1, 2, 1];
    let rnd = Math.floor(Math.random() * percentage.length);
    return percentage[rnd];
};

exports.getTaxiData = () => {
    let rnd = Math.floor(Math.random() * yellowTaxiData.length);
    return yellowTaxiData[rnd];
};

exports.getQueryInfo = () => {
    return "Bronx"
}

exports.getTimestamp = () => {
    return Date.now()
}

exports.getRunningQueryInfo = () => {
    return ["Brooklyn_East", "Brooklyn_North", ""]
}

jsonBuilder = () => {
    return sampleJson_1.jsonBuilder();
}
