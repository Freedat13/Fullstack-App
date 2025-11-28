const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Task = require('../models/Task');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/fullstack_app_db';

const seed = async () => {
  await mongoose.connect(uri);
  await Employee.deleteMany({});
  await Task.deleteMany({});
  const e1 = await Employee.create({name:'Alice Smith', role:'Developer', email:'alice@example.com'});
  const e2 = await Employee.create({name:'Bob Chen', role:'Designer', email:'bob@example.com'});
  await Task.create({title:'Setup project', description:'Initialize repo and structure', assignedTo:e1._id});
  await Task.create({title:'Design landing', description:'Create hero section', assignedTo:e2._id});
  console.log('Seed done');
  process.exit(0);
}

seed();
