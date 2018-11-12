const express = require("express");
const celebrityController = require("../controllers/celebrityController");

const router = express.Router();
//Home
router.get('/', celebrityController.findProfessions);

module.exports = router;