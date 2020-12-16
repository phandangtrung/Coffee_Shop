const express = require("express");
const { check } = require("express-validator");

const commentsController = require("../controller/comments-controllers");

const router = express.Router();

router.get("/", commentsController.getAllComments);
router.get("/:pid", commentsController.getCommentByProductId);

router.post("/", commentsController.createComment);

router.delete("/:cid", commentsController.deleteCommentById);

module.exports = router;
