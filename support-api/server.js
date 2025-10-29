const express = require('express');
const cors = require("cors");
require("dotenv").config();

const adsRouter = require('./routes/ads');
const usersRouter = require('./routes/users');
const userProfilesRouter = require('./routes/user_profiles');
const emailRoute = require('./routes/email');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/ads', adsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/user_profiles', userProfilesRouter);
app.use('/api/v1/email', emailRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
