const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

router.get("/test", (req, res) => res.send("Order route testing!"));

router.get("/", (req, res) => {
  Order.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ Orderfound: "No Order found" }));
});

router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ noOrderfound: "No Order found" }));
});

router.post("/", (req, res) => {
  Order.create(req.body)
    .then((item) => res.json({ msg: "Order added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this item" }));
});

router.put("/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id, req.body)
    .then((item) => res.json({ msg: "Order entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Order" }));
});

module.exports = router;
