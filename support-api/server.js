const express = require('express');
const cors = require("cors");
require("dotenv").config();

const adsRouter = require('./routes/ads');
const usersRouter = require('./routes/users');
const userProfilesRouter = require('./routes/user_profiles');
const emailRoute = require('./routes/email');
const { trackChanges, shouldAccessDB } = require('./middleware/changeTrackingMiddleware');

const app = express();
app.use(cors({
  origin: "https://boomgefen-job-platform-yiax.onrender.com",
  credentials: true
}));

app.use(express.json());

// Apply change tracking middleware
app.use(shouldAccessDB);
app.use(trackChanges);

app.use('/api/v1/ads', adsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/user_profiles', userProfilesRouter);
app.use('/api/v1/email', emailRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
