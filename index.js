import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import route from './routes/route.js';

const app = express()

app.use(express.json());
app.use(cors()); 

// Initialize routes middleware
app.use('/api/post', route);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.API_PORT, () => {
  console.log(`Example app listening on port ${process.env.API_PORT}`)
})