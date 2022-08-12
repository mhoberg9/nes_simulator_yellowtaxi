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
    query: "builder.getQueryInfo("+i+")",
    cpu: "builder.getCpuInfo("+i+")",
    memory: "builder.getMemoryInfo("+i+")",
    network: "builder.getNetworkInfo(" + i+")",
    taxi_data: "builder.getTaxiData(" + i+")",
    timestamp: "builder.getTimestamp(" + i+")",
    running_query: "builder.getRunningQueryInfo(" + i+")"
  });
}
console.log(objectJSON);

try {
  fs.writeFileSync("./generated.json", JSON.stringify(objectJSON));
  // file written successfully
} catch (err) {
  console.error(err);
}
