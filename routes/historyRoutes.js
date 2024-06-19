const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/add", isAuthenticated, historyController.createHistory);
router.get("/", isAuthenticated, historyController.getHistoryByChildId);

module.exports = router;
