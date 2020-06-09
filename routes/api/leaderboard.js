const express = require("express");
const router = express.Router();

const Profile = require("../../models/Profile");

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ likes: -1 });

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
