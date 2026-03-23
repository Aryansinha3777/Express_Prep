🔥 1️⃣ What is MVC?

👉 MVC = Separation of concerns

Model → Data / Database
Controller → Logic
Route → Entry point

👉 (In backend, we don’t use View much — frontend handles it)

🧠 Why MVC?

Without MVC ❌:

All code in one file → messy → hard to scale

With MVC ✅:

Clean → modular → maintainable → scalable
📁 Project Structure
project/
│
├── app.js
├── routes/
│   └── user.routes.js
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js


🔥 2️⃣ MODEL (Data Layer)

📁 models/user.model.js
// Fake DB (for now)
let users = [
    { id: 1, name: "Aryan", age: 22 },
    { id: 2, name: "Rahul", age: 25 }
];
module.exports = users;

🧠 Purpose
👉 Handles data only
DB logic
Schema (later in MongoDB)


🔥 3️⃣ CONTROLLER (Logic Layer)

📁 controllers/user.controller.js

const users = require("../models/user.model");

// GET all users
const getUsers = (req, res) => {
    res.json(users);
};

// GET single user
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
};

// CREATE user
const createUser = (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age
    };

    users.push(newUser);

    res.status(201).json(newUser);
};

// UPDATE user
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.age !== undefined) user.age = req.body.age;

    res.json(user);
};

// DELETE user
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.json({ message: "User deleted" });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};


🧠 Purpose
👉 Handles logic only
No route definitions
No server setup


🔥 4️⃣ ROUTES (Entry Layer)

📁 routes/user.routes.js

const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

// Map routes to controller
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;


🧠 Purpose
👉 Connects URL → controller

🔥 5️⃣ MAIN APP

📁 app.js

const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const userRoutes = require("./routes/user.routes");

// Use routes
app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});



🧠 FULL FLOW (VERY IMPORTANT)
Client → Route → Controller → Model → Response

🔥 Example Flow
GET /users/1

app.js
  ↓
routes/user.routes.js
  ↓
controller/user.controller.js
  ↓
model/user.model.js
  ↓
Response
