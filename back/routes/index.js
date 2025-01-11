const Router = require("express").Router;

const router = Router();

router.use("/characters", require('./Character.route'));

module.exports = router;