# GitTinder

GitTinder is a developer-focused social platform built on the MERN stack. It supports auth, profiles, posts, comments, likes, leaderboard ranking, and image uploads to S3.

## Features

- User registration and login with JWT auth
- Profile creation and updates (skills, socials, experience, education)
- Post creation, categories, comments, likes/unlikes
- Leaderboard based on profile likes
- S3 uploads for profile images and post images
- React + Redux frontend

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Redux, Bootstrap
- Auth: JWT + bcrypt
- Storage: AWS S3 via `multer-s3`

## Repository Structure

- `index.js`: Express app entrypoint
- `routes/`: auth, users, profile, posts, leaderboard
- `models/`: Mongo models (`User`, `Profile`, `Post`, `Poll`)
- `middleware/`: JWT auth, object-id validation
- `client/`: React frontend

## Configuration

This repo resolves config from:

- `config/dev.js` when `NODE_ENV !== "production"`
- `config/prod.js` when `NODE_ENV === "production"` (uses env vars)

### Local development config (`config/dev.js`)

Create `config/dev.js`:

```js
module.exports = {
  jwtSecret: "your_jwt_secret",
  mongoURI: "mongodb://127.0.0.1:27017/gittinder",
  accessKeyId: "your_aws_access_key_id",
  secretAccessKey: "your_aws_secret_access_key",
  Bucket: "your_s3_bucket",
};
```

## Run Locally

```bash
# backend deps
npm install

# frontend deps
npm install --prefix client

# run backend + frontend together
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## Useful Scripts

- `npm run server` - backend only
- `npm run client` - frontend only
- `npm run dev` - both services
- `npm start` - backend in standard mode

## Production Notes

- Frontend build is served by the backend when `NODE_ENV=production`
- `heroku-postbuild` installs/builds the client automatically
