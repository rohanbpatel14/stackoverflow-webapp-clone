import express from 'express';
import cors from 'cors';
import routes from './routes';
import { sql, mongo } from './loaders/db';

const app = express();

const corsOptions = { origin: true, credentials: true };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to StackOverflow. Nothing at GET /' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`StackOverflow server running on port ${PORT}`);
});