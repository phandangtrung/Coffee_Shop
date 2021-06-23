const express = require("express");
const branchesControllers = require("../controller/branches-controllers");

const router = express.Router();

router.post("/", branchesControllers.createBranches);

router.get("/", branchesControllers.getAllBranches);
router.get("/:bid", branchesControllers.getBranchById);

router.put("/:bid", branchesControllers.updateBranchesById);

router.delete("/:bid", branchesControllers.deleteBranchById);

module.exports = router;
