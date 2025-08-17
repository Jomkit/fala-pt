import express from "express";
import { PORT } from "./config/config.js";

import vocabulary from './api/vocabulary.js';

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})

app.use('/vocabulary', vocabulary);