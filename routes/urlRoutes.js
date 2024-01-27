const express = require("express");
const shortId = require("short-unique-id");
const url = require("../models/url");

const router = express.Router();

router.post("/url", async (req, res) => {
  try {
    const data = req.body;
    if (!data.url) {
      res.status(400).json({ error: "Url is required" });
    }
    const uid = new shortId({ length: 8 });
    const shortIdValue = uid.rnd();
    await url.create({
      shortId: shortIdValue,
      redirectURL: data.url,
    });
    console.log("Url created successfully");
    res.status(201).json({ id: shortIdValue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const response = await url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
    );
    res.status(200).redirect(response.redirectURL);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/analytics/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const response = await url.findOne({ shortId });
    res.status(200).json({ totalClicks: response.visitHistory.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
