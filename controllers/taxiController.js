const yellowTaxiData = require("../resources/yellow_taxi.json");
const sampleJson_1 = require("../resources/topologyBuilder_1");
const sampleJson_2 = require("../resources/topologyBuilder_2");
const sampleJson_3 = require("../resources/topologyBuilder_3");

/**
 * Constants
 */
const taxiDataSubBorough = yellowTaxiData.map(x => x.sub_borough);
const brooklynSub = taxiDataSubBorough.filter((x) => x.includes("Brooklyn"))
const bronxSub = taxiDataSubBorough.filter((x) => x.includes("Bronx"))
const queensSub = taxiDataSubBorough.filter((x) => x.includes("Queens"))
const statenSub = taxiDataSubBorough.filter((x) => x.includes("Staten"))
const manhattanSub = taxiDataSubBorough.filter((x) => x.includes("Manhattan"))
const bronx_head = [7]
const bronx_sub = [12, 13, 22, 23, 24, 25, 42, 43, 44, 45, 46, 47, 48, 49, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97]
const manhattan_head = [6]
const manhattan_sub = [10, 11, 18, 19, 20, 21, 34, 35, 36, 37, 38, 39, 40, 41, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]
const brooklyn_head = [8]
const brooklyn_sub = [14, 15, 26, 27, 28, 29, 50, 51, 52, 53, 54, 55, 56, 57, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113]
const queens_head = [16]
const queens_sub = [30, 31, 58, 59, 60, 61, 114, 115, 116, 117, 118, 119]
const staten_head = [17]
const staten_sub = [32, 33, 62, 63, 64, 65]

let counter = 1
let cpuArray = []
let memoryArray = []
let networkArray = []

exports.getTaxiRoutes = async (req, res) => {
    let data = jsonBuilder(counter);
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
            counter = 1
        } else {
            counter++;
        }
    }
};

/**
 * Accepts and array and a nodeId. If there are more than five elements per node it deletes the "oldest" entry
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
        if (mappedArray.length > 5) {
            inputArray.splice(inputArray.findIndex(e => e.id === nodeId && e.timestamp === mappedArray[0]), 1);
        }
    }
    return inputArray
}

exports.getCpuInfo = (nodeId) => {
    let percentage = [20, 24, 25, 20, 24, 25, 21, 26, 23, 24, 20, 24, 25, 20, 24, 25, 21, 26, 23, 24, 20, 24, 25, 20, 24, 25, 21, 26, 23, 24, 92];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        cleanUpHistory(nodeId, cpuArray)
        cpuArray.push({
            id: nodeId, x: Date.now(), y: percentage[rnd]
        })
    } else {
        return 0
    }
    return cpuArray.filter(x => x.id === nodeId);
};

exports.getMemoryInfo = (nodeId) => {
    let percentage = [80, 85, 80, 78, 50, 75, 70, 65, 70, 80, 85, 80, 78, 50, 75, 70, 65, 70, 80, 85, 80, 78, 50, 75, 70, 65, 70, 98];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        cleanUpHistory(nodeId, memoryArray)
        memoryArray.push({
            id: nodeId, x: Date.now(), y: percentage[rnd]
        })
    } else {
        return 0
    }
    return memoryArray.filter(x => x.id === nodeId);
};

exports.getNetworkInfo = (nodeId) => {
    let percentage = [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 0];
    let rnd = Math.floor(Math.random() * percentage.length);
    if (nodeId !== undefined) {
        cleanUpHistory(nodeId, networkArray)
        networkArray.push({
            id: nodeId, x: Date.now(), y: percentage[rnd]
        })
    } else {
        return 0
    }
    return networkArray.filter(x => x.id === nodeId);
};

/*exports.getTaxiData = () => {
    let rnd = Math.floor(Math.random() * yellowTaxiData.length);
    return yellowTaxiData[rnd];
};*/

exports.getLocationInfo = (nodeId) => {
    if (brooklyn_head.includes(nodeId)) {
        return "Brooklyn_Station"
    }
    if (brooklyn_sub.includes(nodeId)) {
        let rnd = Math.floor(Math.random() * brooklynSub.length);
        return "Brooklyn"
/*
        return brooklynSub[rnd]
*/
    }
    if (bronx_head.includes(nodeId)) {
        return "Bronx_Station"
    }
    if (bronx_sub.includes(nodeId)) {
        let rnd = Math.floor(Math.random() * bronxSub.length);
        return "Bronx"
/*
        return bronxSub[rnd]
*/
    }
    if (manhattan_sub.includes(nodeId)) {
        let rnd = Math.floor(Math.random() * manhattanSub.length);
        return "Manhattan"
/*
        return manhattanSub[rnd]
*/
    }
    if (manhattan_head.includes(nodeId)) {
        return "Manhattan_Station"
    }
    if (queens_head.includes(nodeId)) {
        return "Queens_Station"
    }
    if (queens_sub.includes(nodeId)) {
        let rnd = Math.floor(Math.random() * queensSub.length);
        return "Queens"
/*
        return queensSub[rnd]
*/
    }
    if (staten_head.includes(nodeId)) {
        return "Staten_Island_Station"
    }
    if (staten_sub.includes(nodeId)) {
        let rnd = Math.floor(Math.random() * statenSub.length);
        return "Staten_Island"
/*
        return statenSub[rnd]
*/
    }
    return "NYC_Station"
}


exports.getRunningQueryInfo = (nodeId) => {
    let rnd1 = Math.floor(Math.random() * 100000)
    let rnd2 = Math.floor(Math.random() * 100000)
    let rnd3 = Math.floor(Math.random() * 100000)
    return [rnd1,rnd2,rnd3]
}


exports.getNodeType = (nodeId) => {
    if(nodeId === 3){
        return "Coordinator"
    } else {
        return "Worker"
    }
}

jsonBuilder = (counter) => {
    return sampleJson_1.jsonBuilder();

  /*  if (counter === 1) {
        return sampleJson_1.jsonBuilder();
    } else if (counter === 2) {
        return sampleJson_2.jsonBuilder();
    } else if (counter === 3) {
        return sampleJson_3.jsonBuilder();
    }*/
}
