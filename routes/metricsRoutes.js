const express = require("express");

const router = express.Router();
const metricsController = require("../controllers/metricsController");

/**
 * Routing
 */
router.route("/").get(metricsController.getAllMetrics);

router.route("/:nodeId").get(metricsController.getSpecificMetrics);

module.exports = router;
