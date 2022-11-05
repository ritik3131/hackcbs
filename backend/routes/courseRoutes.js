const express = require("express");
const router = new express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllCourse,
  getOneCourse,
  createCourse,
  vote,
  toggleBlackListCourse,
  deleteCourse,
} = require("../controller/courseController");
const { ensureAuth, isAdmin } = require("../middleware/auth");

router.get("/", /*ensureAuth,*/ getAllCourse);

router.get("/currentCourse/:postId", ensureAuth, getOneCourse);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("Images cb ", req, file);
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        req.user._id +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  )
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

router.post("/", upload, /*ensureAuth,*/ createCourse);

// router.patch("/blackList",/*ensureAuth,*/  isAdmin, toggleBlackListCourse);

router.patch("/vote", /*ensureAuth,*/ vote);

router.delete("/:postId", /*ensureAuth,*/ deleteCourse);
module.exports = router;
