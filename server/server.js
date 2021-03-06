const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const fileUpload = require('express-fileupload');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const eventRouter = require('./routes/event.router');
const groupRouter = require('./routes/group.router');
const friendRouter = require('./routes/friend.router');
const eventDetail = require('./routes/detail.router');
const guestRouter = require('./routes/guest.router');
const emailRouter = require('./routes/email.router');
const adminRouter = require('./routes/admin.router');

// Body parser middleware
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/group', groupRouter);
app.use('/api/friend', friendRouter);
app.use('/api/detail', eventDetail);
app.use('/api/guest', guestRouter);
app.use('/api/email', emailRouter);
app.use('/api/admin', adminRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
