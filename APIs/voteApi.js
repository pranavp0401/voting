const exp = require("express");

const voteApp = exp.Router();

voteApp.use(exp.json());

const expressAsyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");

voteApp.get(
  "/votes",
  expressAsyncHandler(async (req, res) => {
    let voteCollection = req.app.get("voteCollection");

    let votes = await voteCollection.findOne({ name: "votes" });

    res.send({ message: votes });
  })
);

// vote cat-1
voteApp.put(
  "/cat1/:username",
  expressAsyncHandler(async (req, res) => {
    let userName = req.params.username;

    let userCollection = req.app.get("userCollection");

    let voteCollection = req.app.get("voteCollection");

    let user = await userCollection.findOne({ username: userName });

    let votes = await voteCollection.findOne({ name: "votes" });

    await userCollection.updateOne(
      { _id: ObjectId(user._id) },
      { $set: { vote: 1, votecat: "category-1" } }
    );

    await voteCollection.updateOne(
      { name: "votes" },
      { $set: { cat1: votes.cat1 + 1 } }
    );

    res.send({ message: "User updated successfully" });
  })
);

voteApp.put(
  "/cat2/:username",
  expressAsyncHandler(async (req, res) => {
    let userName = req.params.username;

    let userCollection = req.app.get("userCollection");

    let voteCollection = req.app.get("voteCollection");

    let user = await userCollection.findOne({ username: userName });

    let votes = await voteCollection.findOne({ name: "votes" });

    await userCollection.updateOne(
      { _id: ObjectId(user._id) },
      { $set: { vote: 1, votecat: "category-2" } }
    );

    await voteCollection.updateOne(
      { name: "votes" },
      { $set: { cat2: votes.cat2 + 1 } }
    );

    res.send({ message: "User updated successfully" });
  })
);

voteApp.put(
  "/cat3/:username",
  expressAsyncHandler(async (req, res) => {
    let userName = req.params.username;

    let userCollection = req.app.get("userCollection");

    let voteCollection = req.app.get("voteCollection");

    let user = await userCollection.findOne({ username: userName });

    let votes = await voteCollection.findOne({ name: "votes" });

    await userCollection.updateOne(
      { _id: ObjectId(user._id) },
      { $set: { vote: 1, votecat: "category-3" } }
    );

    await voteCollection.updateOne(
      { name: "votes" },
      { $set: { cat3: votes.cat3 + 1 } }
    );

    res.send({ message: "User updated successfully" });
  })
);

module.exports = voteApp;
