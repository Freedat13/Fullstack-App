const router = require("express").Router();
const Task = require("../models/Task");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("employeeId", "name");
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  res.json(await Task.create(req.body));
});

router.put("/:id", auth, async (req, res) => {
  res.json(await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.put("/complete/:id", auth, async (req, res) => {
  res.json(await Task.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true }));
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
