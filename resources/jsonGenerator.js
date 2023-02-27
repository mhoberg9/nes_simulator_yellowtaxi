const fs = require("fs");
const builder = require("../controllers/taxiController");

let objectJSON = {
  edges: [],
  nodes: [],
};
let counter = 0;
for (let i = 0; i < 32000; i++) {
  if (i % 2 === 0) {
    counter++;
  }

  objectJSON.edges.push({
    source: i,
    target: counter,
  });
  objectJSON.nodes.push({
    available_resources: 65535,
    id: i,
    type: builder.getNodeType(i),
    location: builder.getLocationInfo(i),
    running_query: builder.getRunningQueryInfo(i),
  });
}
console.log(objectJSON);

try {
  fs.writeFileSync("./generated32000.json", JSON.stringify(objectJSON));
  // file written successfully
} catch (err) {
  console.error(err);
}
