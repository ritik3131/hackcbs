const express = require("express");
const router = new express.Router();
const {
  getReplies,
  createReply,
  toggleBlackListReply,
  vote,
  deleteReply,
  answerToReply,
} = require("../controller/replyController");
const { ensureAuth, isAdmin } = require("../middleware/auth");

router.get("/",/*ensureAuth,*/ getReplies);

router.post("/",/*ensureAuth,*/ createReply);

router.post("/answer",/*ensureAuth,*/ answerToReply);

router.patch("/blacklist", ensureAuth, isAdmin, toggleBlackListReply);

router.patch("/vote",/*ensureAuth,*/ vote);

router.delete("/:replyId/delete/:postId", ensureAuth, deleteReply);
module.exports = router;
