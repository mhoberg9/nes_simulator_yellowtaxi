# NES Data Producer for the NYC Taxi Scenario

This project represents the data producer for the Bachelor Thesis "Combining Resource Monitoring and
System Mapping in a single Infrastructure Topology Diagram - A Performance and Design Evaluation"
by Malte Hoberg.

The thesis explored different visualization and monitoring approaches for the NES topology.

The data producer simply simulates the data that would be provided by NES.

## Pre-requisites
* NodeJS 16 or higher

## Installation
Simply run 'npm install' in the root directory of the project.

## Usage
* Run 'npm start' in the root directory of the project.
* Metrics endpoint available at "localhost:4000/api/v1/metrics/:nodeId"
* Topology endpoint available at "localhost:4000/api/v1/taxi/:dataVersion"


## Functionality
The data producer provides two endpoints for the topology and metrics data. 
The topology data is provided in the following format:
```
return {
        edges: [
            {
                source: 117, target: 59,
            }, {
                source: 118, target: 60,
            }, {
                source: 119, target: 60,
            },
            ... ], 
        nodes: [
            {
                 available_resources: 65535,
                 id: 0,
                 location: builder.getLocationInfo(0),
                 type: builder.getNodeType(0),
                 running_query: builder.getRunningQueryInfo(0)
               },
               {
                 available_resources: 65535,
                 id: 1,
                 location: builder.getLocationInfo(1),
                 type: builder.getNodeType(1),
                 running_query: builder.getRunningQueryInfo(1)
               },
               ... ]
    }
```
The metrics data is provided in the following format:
```
return {
    wrapped_cpu: {
      CORE_1: {...},
      CORE_2: {...},
      TOTAL: {
        CORE_NUM: 0,
        GUEST: 0,
        GUESTNICE: 0,
        IDLE: idleCpu,
        IOWAIT: 1502,
        IRQ: 0,
        NICE: 290,
        SOFTIRQ: 3018,
        STEAL: 0,
        SYSTEM: systemCpu,
        USER: 346209,
      },
    },
    memory: {
      BUFFER_RAM: usedRam,
      FREE_HIGH: 0,
      FREE_RAM: freeRam,
      FREE_SWAP: 2147479552,
      LOADS_15MIN: 122336,
      LOADS_1MIN: 80704,
      LOADS_5MIN: 146432,
      MEM_UNIT: 1,
      PROCS: 1666,
      SHARED_RAM: 116293632,
      TOTAL_HIGH: 0,
      TOTAL_RAM: 41721716736,
      TOTAL_SWAP: 2147479552,
    },
    wrapped_network: [
      {
        R_BYTES: bytesReceived,
        R_COMPRESSED: 0,
        R_DROP: 0,
        R_ERRS: 0,
        R_FIFO: 0,
        R_FRAME: 0,
        R_MULTICAST: 0,
        R_PACKETS: 10634,
        T_BYTES: 1083094,
        T_CARRIER: 0,
        T_COLLS: 0,
        T_COMPRESSED: 0,
        T_DROP: 0,
        T_ERRS: 0,
        T_FIFO: 0,
        T_PACKETS: 10634,
      },
    ],
  };
```



## Documentation
- Documentation included within the thesis

