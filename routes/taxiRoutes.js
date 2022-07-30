const express = require("express");

const router = express.Router();
const taxiController = require("../controllers/taxiController");

/**
 * Routing
 */

router.route("/").get(taxiController.getTaxiRoutes)

//   .post(tourController.simulateRoute);

// router
//     .route('/:id')
//     .get(stockController.getSpecificStock)
//     .delete(stockController.deleteStock)

module.exports = router;