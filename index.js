const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/openai', require('./routes/openAIRoute'))

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`SuccessFully Connected To ${port}`);
});
