const express = require('express');
const cors = require("cors");
const port = process.env.PORT || 3001;

require("dotenv").config();

const adsRouter = require('./routes/ads');
const usersRouter = require('./routes/users');
const userProfilesRouter = require('./routes/user_profiles');

const app = express();
app.use(cors());
app.use(express.json());
const server = require('http').createServer(app);

app.use('/api/v1/ads', adsRouter);
app.use('/api/v1/users',usersRouter );
app.use('/api/v1/user_profiles',userProfilesRouter );

server.listen(port);

