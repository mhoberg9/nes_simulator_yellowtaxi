const express = require("express");

const router = express.Router();
const taxiController = require("../controllers/taxiController");

/**
 * Routing
 */
router.route("/").get(taxiController.helloWorld);
router.route("/:dataVersion").get(taxiController.getTaxiRoutes);

module.exports = router;
