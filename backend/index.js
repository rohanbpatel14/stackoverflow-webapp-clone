const express = require('express')
const cors = require('cors')

const app = express();

const corsOptions = { origin: ['http://localhost:3000'] };
app.use(cors(corsOptions));

const loader = require('./loaders/db')

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to StackOverflow. Nothing at GET /' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`StackOverflow server running on port ${PORT}`);
});