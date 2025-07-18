import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Transaction Service OK');
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Transaction service running on port ${PORT}`);
});
