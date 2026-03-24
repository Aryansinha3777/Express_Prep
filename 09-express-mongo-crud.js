// =======================================================
// 🔥 1. IMPORTS
// =======================================================

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


// =======================================================
// 🔥 2. CONNECT TO MONGODB
// =======================================================

mongoose.connect("mongodb://127.0.0.1:27017/myApp")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// =======================================================
// 🔥 3. SCHEMA
// =======================================================

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});


// =======================================================
// 🔥 4. MODEL
// =======================================================

const User = mongoose.model("User", userSchema);

//note
🔥 The Line
const User = mongoose.model("User", userSchema);
🧠 One-Line Meaning
👉 Creates a Model (class) to interact with the users collection in MongoDB
                                                                       
🔥 Break It Down
🟢 1. "User" (Model Name)
"User"

👉 This is the model name

Mongoose will:
Convert "User" → "users"

👉 Collection name becomes:

users
🟢 2. userSchema
userSchema

👉 Defines:
Structure of each document
Example:
{
    name: String,
    age: Number
}
🟢 3. mongoose.model()

👉 This function:

Creates a Model using schema
🔥 What is User?
const User = ...

👉 User becomes:

A class (constructor function)
🧠 Real Meaning
User = tool to talk to "users" collection
🔥 What You Can Do With It
🟢 Create
await User.create({ name: "Aryan" });
🟢 Read
await User.find();
🟢 Update
await User.updateOne(...);
🟢 Delete
await User.deleteOne(...);
🔥 Internal Working (Very Important)

When you write:

const User = mongoose.model("User", userSchema);

👉 Mongoose does:

1. Create collection → users
2. Attach schema rules
3. Return a model object


// =======================================================
// 🔥 5. CRUD API (REAL)
// =======================================================


// 🟢 CREATE USER
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created",
            user
        });
    } catch (err) {
        res.status(400).json({
            message: "Error creating user",
            error: err.message
        });
    }
});


// 🟢 GET ALL USERS
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// 🟢 GET SINGLE USER
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
});


// 🟢 UPDATE USER
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return updated data
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User updated",
            user
        });
    } catch (err) {
        res.status(400).json({ message: "Error updating user" });
    }
});


// 🟢 DELETE USER
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting user" });
    }
});


// =======================================================
// 🔥 6. START SERVER
// =======================================================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
