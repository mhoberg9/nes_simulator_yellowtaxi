exports.getAllMetrics = async (req, res) => {
    let data = produceDataForAllNodes();
    try {
        return res.status(200).json({
            data: data
        });
    } catch (e) {
        res.status(404).json({
            status: "fail", message: e,
        });
    }
};

exports.getSpecificMetrics = async (req, res) => {
    let nodeId = req.nodeId;
    let data = produceDataForSingleNode(nodeId);
    try {
        return res.status(200).json({
            data: data
        });
    } catch (e) {
        res.status(404).json({
            status: "fail", message: e,
        });
    }
};

const produceDataForSingleNode = (nodeId) => {

    let totalCpu = 1761933
    let systemCpu = Math.floor(Math.random() * totalCpu/6)
    let idleCpu = totalCpu - systemCpu

    let totalRam = 41721716736;
    let usedRam = Math.floor(Math.random() * totalRam/6)
    let freeRam = totalRam - usedRam

    let bytesReceived = Math.floor(Math.random() * 10000000)



    return {
        "wrapped_cpu": {
            "CORE_1": {
                "CORE_NUM": 1,
                "GUEST": 0,
                "GUESTNICE": 0,
                "IDLE": 165593,
                "IOWAIT": 208,
                "IRQ": 0,
                "NICE": 109,
                "SOFTIRQ": 5,
                "STEAL": 0,
                "SYSTEM": 10830,
                "USER": 43651
            }, "CORE_2": {
                "CORE_NUM": 8,
                "GUEST": 0,
                "GUESTNICE": 0,
                "IDLE": 163532,
                "IOWAIT": 158,
                "IRQ": 0,
                "NICE": 60,
                "SOFTIRQ": 2738,
                "STEAL": 0,
                "SYSTEM": 10901,
                "USER": 42541
            }, "TOTAL": {
                "CORE_NUM": 0,
                "GUEST": 0,
                "GUESTNICE": 0,
                "IDLE": idleCpu,
                "IOWAIT": 1502,
                "IRQ": 0,
                "NICE": 290,
                "SOFTIRQ": 3018,
                "STEAL": 0,
                "SYSTEM": systemCpu,
                "USER": 346209
            }
        }, "memory": {
            "BUFFER_RAM": usedRam,
            "FREE_HIGH": 0,
            "FREE_RAM": freeRam,
            "FREE_SWAP": 2147479552,
            "LOADS_15MIN": 122336,
            "LOADS_1MIN": 80704,
            "LOADS_5MIN": 146432,
            "MEM_UNIT": 1,
            "PROCS": 1666,
            "SHARED_RAM": 116293632,
            "TOTAL_HIGH": 0,
            "TOTAL_RAM": 41721716736,
            "TOTAL_SWAP": 2147479552
        }, "wrapped_network": [{
            "R_BYTES": bytesReceived,
            "R_COMPRESSED": 0,
            "R_DROP": 0,
            "R_ERRS": 0,
            "R_FIFO": 0,
            "R_FRAME": 0,
            "R_MULTICAST": 0,
            "R_PACKETS": 10634,
            "T_BYTES": 1083094,
            "T_CARRIER": 0,
            "T_COLLS": 0,
            "T_COMPRESSED": 0,
            "T_DROP": 0,
            "T_ERRS": 0,
            "T_FIFO": 0,
            "T_PACKETS": 10634
        }]
    };
}

// produce metrics for all nodes
const produceDataForAllNodes = () => {
    let jsonAllNodes = {}
    for (let i = 1; i <= 120; i++) {
        console.log("nodeId: " + i)
        Object.assign(jsonAllNodes, { [i]: produceDataForSingleNode(i) })
    }
    return jsonAllNodes
}