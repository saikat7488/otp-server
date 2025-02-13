const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

//Routing Request
router.post("/", controllers.emailController.create);

module.exports = router;
