const fs = require("fs");

let objectJSON = {
  edges: [],
  nodes: [],
};
let counter = 0;
for (let i = 0; i < 120; i++) {
  if (i % 2 == 0) {
    counter++;
  }

  objectJSON.edges.push({
    source: i,
    target: counter,
  });
  objectJSON.nodes.push({
    available_resources: 65535,
    id: i,
    ip_address: "127.0.0.1",
    isMobile: false,
    location: null,
    query: "getQueryInfo",
    cpu: "getCpuInfo",
    memory: "getMemoryInfo",
    network: "getNetworkInfo",
    taxi_data: "getTaxiData",
    timestamp: "getTimestamp",
    running_query: "getRunningQueryInfo"
  });
}
console.log(objectJSON);

try {
  fs.writeFileSync("./generated.json", JSON.stringify(objectJSON));
  // file written successfully
} catch (err) {
  console.error(err);
}
