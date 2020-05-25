module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  githubToken: process.env.GIT_HUB_TOKEN,
  mongoURI: process.env.MONGO_URI,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET,
};
