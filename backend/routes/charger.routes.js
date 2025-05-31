const express = require("express");
const router = express.Router();
const chargerController = require("../controllers/charger.controller");
const verifyToken = require("../middleware/auth.middleware");

router.post("/", verifyToken, chargerController.createCharger);
router.get("/", chargerController.getAllChargers);
router.put("/:id", verifyToken, chargerController.updateCharger);
router.delete("/:id", verifyToken, chargerController.deleteCharger);

module.exports = router;
