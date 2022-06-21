const exp = require("express");

const app = exp();

app.use(exp.json());

const path = require("path");

require("dotenv").config();

const dbUrl = process.env.DATABASE_CONNECTION_URL;

const mClient = require("mongodb").MongoClient;

mClient
  .connect(dbUrl)
  .then((client) => {
    const db = client.db("Voting");
    const userCollection = db.collection("userCollection");
    const voteCollection = db.collection("voteCollection");

    app.set("userCollection", userCollection);
    app.set("voteCollection", voteCollection);

    console.log("DB successfully connected");
  })
  .catch((err) => console.log(`Error Occured: ${err.message}`));

const userApp = require("./APIs/userApi");
const voteApp = require("./APIs/voteApi");

app.use("/user", userApp);
app.use("/vote", voteApp);

if (process.env.NODE_ENV !== "production") {
  app.use(exp.static(path.join(__dirname, "..", "client", "build")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.use((req, res) => {
  res.send({ message: `Invalid Path: ${req.url}` });
});

app.use((err, req, res) => {
  res.send({ message: "Error Occured", reason: err.message });
});

const port = process.env.PORT || 8400;

app.listen(port, () => console.log(`Server listening on port ${port}`));
