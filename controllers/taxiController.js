const yellowTaxiData = require("../resources/yellow_taxi.json");
const sampleJson_1 = require("../resources/topologyBuilder_1");

let counter = 0
let cpuArray = []

exports.getTaxiRoutes = async (req, res) => {
    let data = jsonBuilder(counter);
    //console.log(JSON.stringify(data));
    try {
        return res.status(200).json({
            data, jsonBuilder
        });
    } catch (e) {
        res.status(404).json({
            status: "fail", message: e,
        });
    } finally {
        if (counter === 3) {
            counter = 0
        } else {
            counter++;
        }
    }
};

function cleanUpHistory(nodeId) {
    let filteredArray = cpuArray.filter(x => x.id === nodeId);
    console.log("filter: " + filteredArray)
    if (filteredArray.length > 1) {
        let mappedArray = filteredArray.map((x => x.timestamp)).sort(function (x, y) {
            return x.timestamp - y.timestamp;
        });
        console.log(mappedArray)
        if (mappedArray.length > 5) {
            console.log("inside delete loop")
            cpuArray.filter(x => x.id === nodeId).sort(function (x, y) {
                return x.timestamp - y.timestamp;
            }).shift()
            console.log(cpuArray)
        }
    }
    return cpuArray
}

exports.getCpuInfo = (nodeId) => {
    let percentage = [20, 24, 25, 20, 24, 25, 21, 26, 23, 24];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        console.log(nodeId)
        cleanUpHistory(nodeId)
        cpuArray.push({
            id: nodeId, cpu: percentage[rnd], timestamp: Date.now()
        })
    } else {
        return percentage[rnd]
    }

    console.log(cpuArray.filter(x => x.id === 4))
    return cpuArray.filter(x => x.id === nodeId);
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
    return ["Brooklyn_East", "Brooklyn_North"]
}

jsonBuilder = (counter) => {
    console.log(counter)
    return sampleJson_1.jsonBuilder();
}
