// =======================================================
// 🔥 1. WHY EXPRESS ROUTER?
// =======================================================

// Problem without router:
// All routes in one file → messy, unmanageable

// Solution:
// Split routes into different files using Router


// =======================================================
// 🔥 2. CREATE ROUTER
// =======================================================

const express = require("express");
const router = express.Router();


// =======================================================
// 🔥 3. SAMPLE ROUTES INSIDE ROUTER
// =======================================================

let users = [
    { id: 1, name: "Aryan", age: 22 },
    { id: 2, name: "Rahul", age: 25 }
];

// GET all users
router.get("/", (req, res) => {
    res.json(users);
});

// GET single user
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});


// =======================================================
// 🔥 4. EXPORT ROUTER
// =======================================================

module.exports = router;

/////////index.js or app.js\\\\\\\\\\

// =======================================================
// 🔥 5. IMPORT ROUTER
// =======================================================

const express = require("express");
const app = express();

app.use(express.json());

// Import router
const userRouter = require("./11-express-router"); //nothing just import statement using require


// =======================================================
// 🔥 6. USE ROUTER
// =======================================================

app.use("/users", userRouter);


// =======================================================
// 🔥 7. START SERVER
// =======================================================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

//note
🔥 How It Connects to Main App
app.use("/users", router);
🧠 Now Actual Route Becomes
router.get("/")

👉 becomes:

/users
🔥 Internal Working (Very Important)

When you write:

const router = express.Router();

👉 Express creates:

{
  stack: [],   // stores routes
  methods: {}  // HTTP methods
}

Then when you do:

router.get("/", handler);

👉 It stores:

[
  {
    method: "GET",
    path: "/",
    handler: function
  }
]
🧠 When Request Comes
GET /users

Flow:

app → "/users" matched
    ↓
router activated
    ↓
router checks "/"
    ↓
handler runs

🔥 How It Connects to Main App
app.use("/users", router);
🧠 Now Actual Route Becomes
router.get("/")

👉 becomes:

/users
🔥 Internal Working (Very Important)

When you write:

const router = express.Router();

👉 Express creates:

{
  stack: [],   // stores routes
  methods: {}  // HTTP methods
}

Then when you do:

router.get("/", handler);

👉 It stores:

[
  {
    method: "GET",
    path: "/",
    handler: function
  }
]
🧠 When Request Comes
GET /users

Flow:

app → "/users" matched
    ↓
router activated
    ↓
router checks "/"
    ↓
handler runs





//note
🧠 HOW IT WORKS (VERY IMPORTANT)
🔥 When request comes:
GET /users

Flow:

Client
  ↓
app.use("/users", userRouter)
  ↓
router.get("/")
  ↓
Response
🔥 Example 2:
GET /users/1

Flow:

/users → router activated
/:id → matched
🧠 KEY CONCEPT
app.use("/users", userRouter);

👉 Means:

"All routes inside router will start with /users"
🔥 So inside router:
router.get("/")

👉 Actually becomes:

/users
router.get("/:id")

👉 Actually becomes:

/users/:id
🎯 WHY THIS IS IMPORTANT

Without router:

app.get("/users", ...)
app.get("/users/:id", ...)
app.post("/users", ...)

👉 Everything in one file ❌ messy

With router:

routes/
   users.js
   products.js
   orders.js

👉 Clean & scalable ✅

🧠 REAL PROJECT STRUCTURE
project/
│
├── app.js
├── routes/
│   ├── users.js
│   ├── products.js
│
├── controllers/
├── models/
  
🔥 INTERVIEW QUESTIONS
Q1: What is Express Router?
👉 Used to create modular route handlers

Q2: Why use Router?
👉 To organize code and avoid large files

Q3: Difference between app and router?
app	router
Main app	Mini app
Global	Modular
🧠 FINAL MENTAL MODEL
app = main server
router = sub-module handling specific routes
