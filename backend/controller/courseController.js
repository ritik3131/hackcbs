const courseModel = require("../model/Courses");
const postModel = require("../model/Posts");
const mongoose = require("mongoose");

const getAllCourse = async (req, res) => {
  try {
    //?sort=hot
    let sortby = { createdAt: -1 };
    if (req.query.sort == "hot") sortby = { noupvotes: -1 };

    let filter = { blacklist: "false" };
    if (req.session.isAdmin) filter = {};
    if (req.query.sort == "pinned") filter.userid = { $in: req.user.pinned };
    const courses = await courseModel
      .find(filter)
      .sort(sortby)
      .populate("userid")
      .exec();
    const myCourses = await courseModel
      .find({ userid: req.user._id })
      .sort(sortby)
      .populate("userid")
      .exec();
    res.status(200).json({ courses, myCourses });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const getOneCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let sortby = { upvotes: -1 };
    let showBlacklist = { blackList: "false" };
    if (req.session.isAdmin) showBlacklist = {};
    const course = await courseModel.findById(courseId).populate("userid");
    const sections = (await courseModel.findById(courseId).populate("sections"))
      .sections;
    // const sections = await postModel
    //   .find({ postid: postId, showBlacklist })
    //   .sort(sortby);
    res.status(200).json({ course, sections });
  } catch (err) {
    res.status(400).send();
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = new courseModel({
      username: req.user.name,
      // username: req.body.name,
      content: req.body.content,
      image: req.file.path,
      userid: mongoose.Types.ObjectId(req.user._id),
      // userid: req.body.userId,
      description: req.body.description,
    });
    await newCourse.save();
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const toggleBlackListCourse = async (req, res) => {
  try {
    const change = { blacklist: !req.body.blacklist };
    const postId = req.body.postId;
    await courseModel.findByIdAndUpdate(postId, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId.trim();
    const course = await courseModel.findById(courseId);
    if (req.user._id.toString() === course.userid.toString())
      return await course.delete();
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};

const vote = async (req, res) => {
  // request body {
  //   upvote:Boolean  // If someone wants to upvote this will be true if downvote then false
  //   postId:
  //   userId
  // }
  try {
    const up = req.body.upvote;
    const courseId = req.body.courseId;
    const userId = req.body.userId;
    // const userId = req.user._id
    try {
      const course = await courseModel.findById(courseId);
      let downvoters = course.downvotes;
      let upvoters = course.upvotes;
      if (up) {
        if (downvoters.includes(userId)) {
          const index = downvoters.indexOf(userId);
          if (index > -1) {
            downvoters.splice(index, 1);
          }
        }
        if (upvoters.includes(userId)) {
          const index = upvoters.indexOf(userId);
          if (index > -1) {
            upvoters.splice(index, 1);
          }
        } else {
          upvoters.push(userId);
        }
      } else {
        if (upvoters.includes(userId)) {
          const index = upvoters.indexOf(userId);
          if (index > -1) {
            upvoters.splice(index, 1);
          }
        }
        if (downvoters.includes(userId)) {
          const index = downvoters.indexOf(userId);
          if (index > -1) {
            downvoters.splice(index, 1);
          }
        } else {
          downvoters.push(userId);
        }
      }
      change = {
        downvotes: downvoters,
        upvotes: upvoters,
        noupvotes: upvoters.length,
      };
      if (downvoters.length > 100) change.blacklist = true;

      await courseModel.findByIdAndUpdate(courseId, change);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: "Course does not exit",
      });
    }
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  getAllCourse,
  getOneCourse,
  vote,
  createCourse,
  toggleBlackListCourse,
  deleteCourse,
};
