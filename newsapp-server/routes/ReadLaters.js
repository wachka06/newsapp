const express = require("express");
const router = express.Router();
const ReadLater = require("../models/ReadLater");

router.get("/", async (req, res) => {
  try {
    const readLaters = await ReadLater.find();
    res.json(readLaters);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const { title, url } = req.body;
  const readLater = new ReadLater({ title, url });
  try {
    const savedReadLater = await readLater.save();
    res.status(201).json(savedReadLater);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedReadLater = await ReadLater.findOneAndDelete({
      _id: req.params.id,
    });
    if (!removedReadLater) {
      res.status(404).send();
    }
    res.json(removedReadLater);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
