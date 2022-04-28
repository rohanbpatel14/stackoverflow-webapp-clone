import express from 'express';

const app = express();

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Kafka server running on port ${PORT}`);
});