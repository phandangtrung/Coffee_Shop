const express = require("express");
const branchesControllers = require("../controller/branches-controllers");

const router = express.Router();

router.get("/", branchesControllers.getAllBranches);
router.get("/:bid", branchesControllers.getBranchById);

router.post("/",branchesControllers.createBranches );

router.put("/:bid",branchesControllers.updateBranches);

module.exports = router;
