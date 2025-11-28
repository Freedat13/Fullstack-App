const router = require("express").Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Employee.find());
});

router.post("/", auth, async (req, res) => {
  res.json(await Employee.create(req.body));
});

router.put("/:id", auth, async (req, res) => {
  res.json(await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", auth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
