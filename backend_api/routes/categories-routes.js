const express = require("express");
const categoriesController = require("../controller/categories-controllers");
const productsController = require("../controller/products-controllers");

const router = express.Router();

router.get("/", categoriesController.getAllCategory);
router.get("/:cid", categoriesController.getCategoryById);
router.get("/Products/:cid", productsController.getProductByCateId);
router.post("/", categoriesController.createCategory);

router.put("/:cid", categoriesController.updateCategoryById);

router.delete("/:cid", categoriesController.deleteProductByCateId);
//router.delete("/:cid", categoriesController.deleteCategoryById);
//router.delete("/:cid", productsController.deleteProductByCateId);
module.exports = router;
