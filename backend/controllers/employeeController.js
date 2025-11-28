const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({createdAt:-1});
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.addEmployee = async (req, res) => {
  const { name, role, email, phone } = req.body;
  try {
    const emp = new Employee({name, role, email, phone});
    await emp.save();
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({message:'Employee not found'});
    await emp.remove();
    res.json({message:'Employee removed'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
