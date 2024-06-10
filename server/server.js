const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // Load environment variables
const userRoutes = require('./routes/users');
const imageRoutes = require('./routes/images');

const app = express();
app.use(express.json());
app.use('/uploads', express.static('../uploads'));  // Serve files from uploads directory

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT || 3000}`));