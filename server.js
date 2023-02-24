const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const keys = require("./config/keys");
const validator = require("validator");

const app = express();
const publicPath = path.join(__dirname, "index.html");
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const port = 3000;

mongoose
  .connect(`mongodb+srv://RL20:${keys.CONNECT_PASS}@general.fsc8g.mongodb.net/Landing_pages?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
});

const Email = mongoose.model("Email", emailSchema);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
  console.log("got it");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(publicPath));
// });

app.post("/", async (req, res) => {
  console.log("req.body", req.body);
  const email = new Email(req.body);
  try {
    console.log(email);
    await email.save();
    res.sendFile(path.join(__dirname + "/thanks.html"));
    // res.status(201).send(thanks.html);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
