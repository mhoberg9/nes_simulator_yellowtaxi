const express = require('express');
        
const tourRouter = require('./routes/tourRoutes')
const subTourRouter = require('./routes/subTourRoutes')
const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//     console.log('Hello from the middleware');
//     next();
// });

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(`
    Time: ${req.requestTime}
    Url: ${req.url}
    Method: ${req.method}`)
    next();
});

app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/subTours', subTourRouter)
module.exports = app;
