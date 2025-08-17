import express from "express";
import { PORT } from "./config/config.js";

import vocabulary from './api/vocabulary.js';

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send('Something broke');
})

app.use('/vocabulary', vocabulary);

app.use((req, res) => {
  res.status(404).send("How did we get here?");
})