# nes_simulator_yellowtaxi

Simple express server, that returns topology data for NES on a GET request

#How to

1. Make sure to install https://git-lfs.github.com/
2. Navigate into project
3. Run npm install
4. Run npm start

Example JSON:
{
"data": {
"edges": [
{
"source": 4,
"target": 3
},
{
"source": 5,
"target": 3
}
],
"nodes": {
"available_resources": 65535,
"id": 6,
"ip_address": "127.0.0.1",
"isMobile": false,
"location": "Manhattan",
"cpu": [
{
"id": 6,
"x": 1663184356682,
"y": 24
},
{
"id": 6,
"x": 1663184507141,
"y": 21
},
{
"id": 6,
"x": 1663184528575,
"y": 23
},
{
"id": 6,
"x": 1663184658688,
"y": 20
},
{
"id": 6,
"x": 1663184695884,
"y": 24
},
{
"id": 6,
"x": 1663184707395,
"y": 24
}
],
"memory": [
{
"id": 6,
"x": 1663184356682,
"y": 78
},
{
"id": 6,
"x": 1663184507141,
"y": 75
},
{
"id": 6,
"x": 1663184528575,
"y": 80
},
{
"id": 6,
"x": 1663184658688,
"y": 65
},
{
"id": 6,
"x": 1663184695884,
"y": 75
},
{
"id": 6,
"x": 1663184707395,
"y": 75
}
],
"network": [
{
"id": 6,
"x": 1663184356682,
"y": 2
},
{
"id": 6,
"x": 1663184507141,
"y": 2
},
{
"id": 6,
"x": 1663184528575,
"y": 2
},
{
"id": 6,
"x": 1663184658688,
"y": 2
},
{
"id": 6,
"x": 1663184695885,
"y": 2
},
{
"id": 6,
"x": 1663184707395,
"y": 1
}
],
"running_query": [
34396,
29181,
14668
]
}
}
}
