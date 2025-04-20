const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const Role = require('./models/role.model');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
connectDB();

// Initialize roles (updated to use async/await)
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    
    if (count === 0) {
      await new Role({ name: 'user' }).save();
      console.log("added 'user' to roles collection");
      
      await new Role({ name: 'admin' }).save();
      console.log("added 'admin' to roles collection");
    }
  } catch (err) {
    console.error('Error initializing roles:', err);
  }
}

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to authentication application.' });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await initial();
});