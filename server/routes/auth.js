const express = require("express");
const { getAuthToken } = require("../controllers/authControllers");

const router = express.Router();

router.post("/auth_token", getAuthToken);
router.get("/auth_token", getAuthToken);

module.exports = router;
