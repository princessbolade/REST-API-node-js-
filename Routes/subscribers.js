const express = require("express");
const router = express.Router();
const subscriber = require("../models/subscriber");

//Getting All
router.get("/", async (req, res) => {
  try {
    const subscribers = await subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber.name);
});

//Creating one
router.post("/", async (req, res) => {
  let subscriberModule = new subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriberModule.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Updating one

router.patch("/", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscrier.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "We don throw you comot" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await subscriber.findById(req.params.id);

    if (subscriber == null)
      return res
        .status(404)
        .json({ message: "Abeg , you sure say you subscribe?" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;

  next();
}

module.exports = router;
