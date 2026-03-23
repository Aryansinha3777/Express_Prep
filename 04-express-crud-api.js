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

//note
🔥 Break It Down
🟢 1. users
let users = [
  { id: 1, name: "Aryan" },
  { id: 2, name: "Rahul" }
];
👉 This is an array of objects
🟢 2. .find()
👉 JavaScript array method
array.find(callback)
👉 It:
Checks each element
Returns the first match
If nothing found → returns undefined
🟢 3. (u => u.id === id)
👉 This is an arrow function (callback)
Equivalent to:
function(u) {
    return u.id === id;
}
🔥 Step-by-Step Execution
Let’s say:
const id = 2;
Step 1:
Check first user:
u = { id: 1, name: "Aryan" 
1 === 2 ❌ false
Step 2:

Check second user:
u = { id: 2, name: "Rahul" }
2 === 2 ✅ true
Step 3:

👉 .find() stops immediately and returns:

{ id: 2, name: "Rahul" }
🧠 Final Result
const user = { id: 2, name: "Rahul" };
🔴 If No Match Found
const id = 5;

👉 No user found → returns:

undefined
🔥 That’s Why We Write This
if (!user) {
    return res.status(404).json({ message: "User not found" });
}
🧠 Important Insight
👉 .find() returns object, not array

🔥 Difference From .filter()
Method	Returns
.find()	First matching object
.filter()	Array of all matches
Example:
users.filter(u => u.id === 2);

👉 Output:
[ { id: 2, name: "Rahul" } ]

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

//note
⚠️ VERY IMPORTANT ISSUE (Interview Level)
❌ Problem with this line:
user.age = req.body.age || user.age;
Case:
{
  "age": 0
}
👉 0 is falsy → ignored ❌
👉 So age will NOT update

✅ Correct Version (Better)
if (req.body.name !== undefined) {
    user.name = req.body.name;
}

if (req.body.age !== undefined) {
    user.age = req.body.age;
}
🧠 PUT vs PATCH (IMPORTANT)
🔵 PUT
👉 Replace entire resource
{
  "name": "A",
  "age": 20
}
🟡 PATCH
👉 Update partial fields
{
  "name": "A"
}
👉 Your code behaves more like PATCH, not strict PUT

//note
🔥 Your Code
res.json({
    message: "User updated",
    user
});
🧠 Your Question
Why user and not user: user?

🔥 Answer (Simple)
👉 Because of ES6 Object Property Shorthand

🧠 Normal Way (Old JS)
const user = { id: 1, name: "Aryan" };

res.json({
    message: "User updated",
    user: user
});
🔥 Modern Way (Shorthand)
res.json({
    message: "User updated",
    user
});

👉 This automatically means:

user: user
🧠 Rule
👉 If:
key === variable name

Then you can write:
key
🔥 Example
const name = "Aryan";
const age = 22;

const obj = {
    name,
    age
};

👉 Equivalent to:

const obj = {
    name: name,
    age: age
};
🔴 When You CANNOT Use Shorthand

If key is different:
res.json({
    userData: user   // ❌ shorthand NOT possible
});
👉 You must write full form

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

//note
🔥 Break It Down
🟢 1. app.listen(3000, ...)

👉 Tells Express:
"Start server on port 3000"
🧠 What is a Port?
👉 A door/entry point on your computer

Example:

http://localhost:3000
localhost → your machine
3000 → port number
🟢 2. Callback Function
() => {
    console.log("Server running...");
}

👉 Runs when server successfully starts


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
