// =======================================================
// 🔥 1. WHAT IS MONGOOSE?
// =======================================================

// Mongoose is a library (ODM - Object Data Modeling)

// 👉 It connects:
// Node.js (Express) → MongoDB

// Without Mongoose:
// You write raw MongoDB queries ❌

// With Mongoose:
// You use simple JS methods ✅


// =======================================================
// 🔥 2. INSTALLATION
// =======================================================

// npm install mongoose


// =======================================================
// 🔥 3. CONNECT TO DATABASE
// =======================================================

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myApp")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// =======================================================
// 🔥 4. SCHEMA (VERY IMPORTANT)
// =======================================================

// Schema = Structure of document

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});


// =======================================================
// 🔥 5. MODEL
// =======================================================

// Model = Interface to interact with collection

const User = mongoose.model("User", userSchema);

// MongoDB collection name → users


// =======================================================
// 🔥 6. CREATE (INSERT)
// =======================================================

async function createUser() {
    const user = await User.create({
        name: "Aryan",
        age: 22,
        email: "aryan@gmail.com"
    });

    console.log(user);
}


// =======================================================
// 🔥 7. READ (FIND)
// =======================================================

async function getUsers() {
    const users = await User.find();
    console.log(users);
}


// =======================================================
// 🔥 8. FIND ONE
// =======================================================

async function getUserById() {
    const user = await User.findById("some_id_here");
    console.log(user);
}


// =======================================================
// 🔥 9. UPDATE
// =======================================================

async function updateUser() {
    await User.updateOne(
        { name: "Aryan" },
        { age: 23 }
    );
}


// =======================================================
// 🔥 10. DELETE
// =======================================================

async function deleteUser() {
    await User.deleteOne({ name: "Aryan" });
}


// =======================================================
// 🔥 11. VALIDATION (VERY IMPORTANT)
// =======================================================

const schemaWithValidation = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    email: {
        type: String,
        unique: true
    }
});


// =======================================================
// 🔥 12. ASYNC/AWAIT (IMPORTANT)
// =======================================================

// All mongoose operations return Promises

// So always use:
// async/await OR .then()


// =======================================================
// 🔥 13. REAL BACKEND USAGE
// =======================================================

// In Express:

// app.get("/users", async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });


// =======================================================
// 🔥 14. COMMON METHODS
// =======================================================

// User.create()
// User.find()
// User.findById()
// User.updateOne()
// User.deleteOne()


// =======================================================
// 🔥 15. INTERVIEW QUESTIONS
// =======================================================

// Q1: What is Mongoose?
// → ODM for MongoDB

// Q2: Difference between Schema and Model?
// → Schema = structure
// → Model = used to query

// Q3: Why use Mongoose?
// → validation, structure, easy queries


// =======================================================
// 🔥 16. FINAL SUMMARY
// =======================================================

// MongoDB → database
// Mongoose → tool to interact
// Express → API layer

