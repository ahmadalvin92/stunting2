require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const childRoutes = require('./routes/childRoutes');
const historyRoutes = require('./routes/historyRoutes');
const isAuthenticated = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-default-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/auth', authRoutes);
app.use('/child', isAuthenticated, childRoutes);
app.use('/history', isAuthenticated, historyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
