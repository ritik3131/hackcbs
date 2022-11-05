const mongoose = require("mongoose");
const posts = require("./Posts");
const courseSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: "true",
      validate(data) {
        if (data.match(/(fuck|sex|porn|dick|cock|cunt|pussy|asshole)/i))
          throw new Error("Abusive Language detected");
      },
    },
    image: {
      type: String,
      // required: true,
    },
    upvotes: {
      type: Array,
      default: [],
    },
    noupvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Array,
      default: [],
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    // blacklist: {
    //   type: Boolean,
    //   default: false,
    // },
    description: {
      type: String,
      required: true,
    },
    noOfReplies: { type: Number, default: 0 },
    sections: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const course = mongoose.model("course", courseSchema);

module.exports = course;
