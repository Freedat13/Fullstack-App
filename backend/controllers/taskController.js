const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo').sort({createdAt:-1});
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.addTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = new Task({title, description, assignedTo});
    await task.save();
    res.json(await task.populate('assignedTo'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({message:'Task not found'});
    await task.remove();
    res.json({message:'Task removed'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({message:'Task not found'});
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
