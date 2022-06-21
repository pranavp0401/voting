const exp = require("express");

const userApp = exp.Router();

userApp.use(exp.json());

const expressAsyncHandler = require("express-async-handler");

// signin Api
userApp.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    let userData = req.body;
    let userCollection = req.app.get("userCollection");

    userData.vote = 0;

    userData.votecat = "";

    let alreadyUser = await userCollection.findOne({
      username: userData.username
    });

    if (alreadyUser !== null) {
      res.send({ message: "user already exists" });
    } else {
      await userCollection.insertOne(userData);
      res.send({ message: "user created successfully" });
    }
  })
);

// login api
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    let userData = req.body;
    let userCollection = req.app.get("userCollection");

    let alreadyUser = await userCollection.findOne({
      username: userData.username
    });

    if (alreadyUser === null) {
      res.send({ message: "no such user" });
    } else {
      if (userData.password !== alreadyUser.password) {
        res.send({ message: "Incorrect password" });
      } else {
        res.send({ message: "user logged in", username: alreadyUser.username });
      }
    }
  })
);

// get user by username
userApp.get(
  "/username/:username",
  expressAsyncHandler(async (req, res) => {
    let userName = req.params.username;

    let userCollection = req.app.get("userCollection");
    let alreadyUser = await userCollection.findOne({ username: userName });

    res.send({ message: alreadyUser });
  })
);

module.exports = userApp;
