const express = require("express");

const router = express.Router();
const metricsController = require("../controllers/metricsController");

/**
 * Routing
 */

router.route("/:nodeId").get(metricsController.getSpecificMetrics);

//   .post(tourController.simulateRoute);

// router
//     .route('/:id')
//     .get(stockController.getSpecificStock)
//     .delete(stockController.deleteStock)

module.exports = router;
