const express = require("express");

const router = express.Router();
const tourController = require("../controllers/tourController");

/**
 * Routing
 */

router.route("/").get(tourController.getAllOptions).put(tourController.stopSendingData);

router.route("/:district").get(tourController.getSpecificTour)
//   .post(tourController.simulateRoute);

// router
//     .route('/:id')
//     .get(stockController.getSpecificStock)
//     .delete(stockController.deleteStock)

module.exports = router;
