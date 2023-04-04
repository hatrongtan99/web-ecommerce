const router = require("express").Router();
const searchController = require("../controllers/search.controller");
// search ?_q
router.route("/").get(searchController.searchProductOrCategory);

module.exports = router;
