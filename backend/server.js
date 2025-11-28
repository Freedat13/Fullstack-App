const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
