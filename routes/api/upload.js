const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const keys = require("../../config/keys");
const AWS_accessKeyId = keys.accessKeyId;
const AWS_secretAccessKey = keys.secretAccessKey;
const AWS_Bucket = keys.Bucket;

const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

/*PROFILE IMAGE STORING STARTS*/
const s3 = new aws.S3({
  accessKeyId: AWS_accessKeyId,
  secretAccessKey: AWS_secretAccessKey,
  Bucket: AWS_Bucket,
});

/*Single Upload*/
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_Bucket,
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

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

/**
 * @route POST /api/upload/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post("/profile-img-upload", (req, res) => {
  profileImgUpload(req, res, (error) => {
    console.log("Image uploaded", req.file);

    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else if (req.file === undefined) {
      // If File not found
      console.log("Error: No File Selected!");
      res.json("Error: No File Selected");
    } else {
      // Success
      //const imageName = req.file.key;
      const imageLocation = req.file.location;
      const profileFields = {
        // user: req.user_id,
        //displayPictureURL,
      };
    }
  });
});

/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
const maxUploads = 4;
const uploadsBusinessGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_Bucket,
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
}).array("galleryImage", maxUploads);
/**
 * @route POST /api/upload/multiple-file-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post("/multiple-file-upload", auth, (req, res) => {
  uploadsBusinessGallery(req, res, (error) => {
    console.log("files", req.files);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else if (req.files === undefined) {
      // If File not found
      console.log("Error: No File Selected!");
      res.json("Error: No File Selected");
    } else {
      // Success
      let fileArray = req.files,
        fileLocation;
      const galleryImgLocationArray = [];
      for (let i = 0; i < fileArray.length; i++) {
        fileLocation = fileArray[i].location;
        console.log(fileLocation);
        galleryImgLocationArray.push(fileLocation);
      }
      // Save the file name into database
      res.json({
        filesArray: fileArray,
        locationArray: galleryImgLocationArray,
      });
    }
  });
});

module.exports = router;
