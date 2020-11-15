const express = require("express");
const router = express.Router();
const ReadLater = require("../models/ReadLater");

router.get("/", async (req, res) => {
  try {
    const readLaters = await ReadLater.find();
    res.json(readLaters);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body, "req.body");
  const readLater = new ReadLater({
    title: req.body.title,
    url: req.body.url,
  });
  try {
    const savedReadLater = await readLater.save();
    res.json(savedReadLater);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const readLater = await ReadLater.findById(req.params.id);
    res.json(readLater);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedReadLater = await ReadLater.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          url: req.body.url,
        },
      }
    );
    res.json(updatedReadLater);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedReadLater = await ReadLater.deleteOne({ _id: req.params.id });
    res.json(removedReadLater);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
