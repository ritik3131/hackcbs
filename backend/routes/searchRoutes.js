const express = require("express");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const { ensureAuth } = require("../middleware/auth");
const elasticClient = require("../config/elastic");

router.get("/", async (req, res) => {
  try {
    const results = await elasticClient.search({
      index: "search-cbs-courses",
      size: 20,
      query: {
        multi_match: {
          fields: ["content", "description"],
          query: req.query.searchkey,
          fuzziness: "AUTO",
        },
      },
    });
    res.send(results);
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;