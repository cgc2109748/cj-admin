const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use('/', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lottery', require('./routes/lotteryRoutes'));
app.use('/api/lotteryLogs', require('./routes/lotteryLogsRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/award', require('./routes/awardRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
