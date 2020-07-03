const express = require("express");
const keys = require("../config/keys");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");
const checkObjectId = require("../middleware/checkObjectId");

const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

/*PROFILE IMAGE STORING STARTS*/
const s3 = new aws.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  Bucket: keys.Bucket,
});

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      gender,
      displayPictureURL,
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      github,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      displayPictureURL,
      gender,
      company,
      location,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => " " + skill.trim()),
      status,
    };

    // Build social object and add to profileFields
    const socialfields = {
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      github,
    };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true },
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    GET profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  },
);

// @route    GET profile/:user_id/posts
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id/posts",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const posts = await Post.find({ user: { _id: user_id } }).sort({
        date: -1,
      });

      if (!posts) return res.status(400).json({ msg: "No posts" });

      return res.json(posts);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  },
);

router.use("/user/:user_id/posts", require("./postfeatures"));

// @route    DELETE profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.Bucket,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname),
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

/* Check File Type*/
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

/**
 * @route POST /upload/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post("/upload/profile-img-upload", (req, res) => {
  profileImgUpload(req, res, async (error) => {
    console.log("Image uploaded ", req.file.location);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else if (req.file === undefined) {
      // File not found
      console.log("Error: No File Selected!");
      res.json("Error: No File Selected");
    }
    //success
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.displayPictureURL = req.file.location;
      await profile.save();
      res.json(profile);
    } catch (err) {
      //console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
