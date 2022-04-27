import express from 'express';
import cors from 'cors';
import routes from './routes';
import { sql, mongo } from './loaders/db';

const app = express();

const corsOptions = { origin: ['*'] };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to StackOverflow. Nothing at GET /' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`StackOverflow server running on port ${PORT}`);
});