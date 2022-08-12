const yellowTaxiData = require("../resources/yellow_taxi.json");
const sampleJson_1 = require("../resources/topologyBuilder_1");

let counter = 0
let cpuArray = []
let memoryArray = []
let networkArray = []

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

/**
 * Accepts and array and a nodeId. If there a more than five elements per node it deletes the "oldest" entry
 * @param nodeId
 * @param inputArray
 * @returns {*}
 */
function cleanUpHistory(nodeId, inputArray) {
    let filteredArray = inputArray.filter(x => x.id === nodeId);
    if (filteredArray.length > 1) {
        let mappedArray = filteredArray.map((x => x.timestamp)).sort(function (x, y) {
            return x.timestamp - y.timestamp;
        });
        console.log(mappedArray)
        if (mappedArray.length > 5) {
            inputArray.splice(inputArray.findIndex(e => e.id === nodeId && e.timestamp === mappedArray[0]), 1);
        }
    }
    return inputArray
}

exports.getCpuInfo = (nodeId) => {
    let percentage = [20, 24, 25, 20, 24, 25, 21, 26, 23, 24];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        cleanUpHistory(nodeId, cpuArray)
        cpuArray.push({
            id: nodeId, cpu: percentage[rnd], timestamp: Date.now()
        })
    } else {
        return 0
    }
    return cpuArray.filter(x => x.id === nodeId);
};

exports.getMemoryInfo = (nodeId) => {
    let percentage = [80, 85, 80, 78, 50, 75, 70, 65, 70];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        cleanUpHistory(nodeId, memoryArray)
        memoryArray.push({
            id: nodeId, memory: percentage[rnd], timestamp: Date.now()
        })
    } else {
        return 0
    }
    return memoryArray.filter(x => x.id === nodeId);
};

exports.getNetworkInfo = (nodeId) => {
    let percentage = [2, 1, 2, 2, 1, 2, 1, 2, 1];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        cleanUpHistory(nodeId, networkArray)
        networkArray.push({
            id: nodeId, network: percentage[rnd], timestamp: Date.now()
        })
    } else {
        return 0
    }
    return networkArray.filter(x => x.id === nodeId);
};

exports.getTaxiData = () => {
    let rnd = Math.floor(Math.random() * yellowTaxiData.length);
    return yellowTaxiData[rnd];
};

exports.getQueryInfo = (nodeId) => {
    return "Bronx"
}

exports.getTimestamp = (nodeId) => {
    return Date.now()
}

exports.getRunningQueryInfo = (nodeId) => {
    return ["Brooklyn_East", "Brooklyn_North"]
}

jsonBuilder = (counter) => {
    console.log(counter)
    return sampleJson_1.jsonBuilder();
}
