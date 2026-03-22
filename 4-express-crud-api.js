// =======================================================
// 🔥 1. SETUP
// =======================================================

const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());


// =======================================================
// 🔥 2. IN-MEMORY DATABASE
// =======================================================

// Fake DB (array)
let users = [
    { id: 1, name: "Aryan", age: 22 },
    { id: 2, name: "Rahul", age: 25 }
];


// =======================================================
// 🔥 3. GET ALL USERS
// =======================================================

app.get("/users", (req, res) => {
    res.status(200).json(users);
});


// 🧠 OUTPUT:
// [
//   { id: 1, name: "Aryan", age: 22 },
//   { id: 2, name: "Rahul", age: 25 }
// ]


// =======================================================
// 🔥 4. GET SINGLE USER (PARAMS)
// =======================================================

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});


// 🧠 Example:
// GET /users/1 → returns user with id 1


// =======================================================
// 🔥 5. CREATE USER (POST)
// =======================================================

app.post("/users", (req, res) => {
    const newUser = req.body;

    // Simple validation
    if (!newUser.name || !newUser.age) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    }

    newUser.id = users.length + 1;

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});


// 🧠 Example:
// POST /users
// Body: { "name": "Amit", "age": 30 }


// =======================================================
// 🔥 6. UPDATE USER (PUT)
// =======================================================

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;

    res.json({
        message: "User updated",
        user
    });
});


// =======================================================
// 🔥 7. DELETE USER (DELETE)
// =======================================================

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.json({ message: "User deleted" });
});


// =======================================================
// 🔥 8. START SERVER
// =======================================================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


// =======================================================
// 🔥 9. INTERVIEW QUESTIONS
// =======================================================

// Q1: What is CRUD?
// → Create, Read, Update, Delete

// Q2: Why use parseInt(req.params.id)?
// → Params are strings, need number for comparison

// Q3: Difference between PUT and POST?
// → POST creates, PUT updates

// Q4: Why validation?
// → Prevent bad data


// =======================================================
// 🔥 10. REAL BACKEND INSIGHT
// =======================================================

// This is same logic used in real apps
// Only difference:
// Instead of array → we use database (MongoDB)


// =======================================================
// 🔥 11. FINAL SUMMARY
// =======================================================

// You learned:
// ✔ Full CRUD operations
// ✔ Params usage
// ✔ Validation
// ✔ Status codes
// ✔ Real API structure

// Next → Express Router (modular code)

// =======================================================
// 🔥 12. IMPROVED PRACTICES (PRO LEVEL)
// =======================================================

// 1. Better ID generation
const generateId = () => {
    return users.length ? users[users.length - 1].id + 1 : 1;
};

// 2. Improved create user
app.post("/users-advanced", (req, res) => {
    const { name, age } = req.body;

    if (typeof name !== "string" || typeof age !== "number") {
        return res.status(400).json({
            success: false,
            message: "Invalid data types"
        });
    }

    const newUser = {
        id: generateId(),
        name,
        age
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        data: newUser
    });
});


// 3. Handle invalid ID
app.get("/users-advanced/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});


// =======================================================
// 🔥 FINAL INTERVIEW INSIGHT
// =======================================================

// Basic CRUD → shows understanding
// Advanced handling → shows maturity
