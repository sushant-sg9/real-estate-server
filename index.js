const mongoose = require("mongoose");
const app = require("./src/app");

mongoose.connect(
  "mongodb+srv://abhirami:abhirami@cluster0.5mhzgvz.mongodb.net/realestates",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection
  .once("open", () => {
    console.log("connection established");
  })
  .on("connectionError", (err) => {
    console.log(err);
  });
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));
