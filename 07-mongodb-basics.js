// =======================================================
// 🔥 1. WHAT IS MONGODB?
// =======================================================

// MongoDB is a NoSQL database

// ❌ Traditional SQL DB:
// Tables → Rows → Columns

// ✅ MongoDB:
// Database → Collections → Documents (JSON-like)


// Example Document:
{
    name: "Aryan",
    age: 22,
    skills: ["Node", "React"]
}


// =======================================================
// 🔥 2. KEY TERMINOLOGY
// =======================================================

// Database → Container (like project DB)
// Collection → Like table (users, products)
// Document → Actual data (JSON object)

// Example:
// DB: myApp
// Collection: users
// Document: { name: "Aryan", age: 22 }


// =======================================================
// 🔥 3. WHY MONGODB?
// =======================================================

// ✔ Flexible schema (no fixed structure)
// ✔ JSON-like (easy with JS)
// ✔ Fast for modern apps
// ✔ Scalable

// ❌ No joins like SQL (important interview point)


// =======================================================
// 🔥 4. STARTING MONGODB
// =======================================================

// Option 1: MongoDB Atlas (Cloud) ⭐ recommended
// Option 2: Local installation

// For now assume MongoDB is running


// =======================================================
// 🔥 5. BASIC COMMANDS (IMPORTANT)
// =======================================================

// Open Mongo Shell:

// show databases
// use myApp
// show collections


// =======================================================
// 🔥 6. INSERT DATA
// =======================================================

// Insert one document
db.users.insertOne({
    name: "Aryan",
    age: 22
});

// Insert multiple
db.users.insertMany([
    { name: "Rahul", age: 25 },
    { name: "Amit", age: 30 }
]);


// =======================================================
// 🔥 7. READ DATA (FIND)
// =======================================================

// Get all users
db.users.find();

// Get specific user
db.users.find({ name: "Aryan" });

// Pretty format
db.users.find().pretty();


// =======================================================
// 🔥 8. QUERY OPERATORS
// =======================================================

// Greater than
db.users.find({ age: { $gt: 23 } });

// Less than
db.users.find({ age: { $lt: 30 } });

// Equal
db.users.find({ age: 22 });

// Multiple conditions
db.users.find({
    age: { $gt: 20 },
    name: "Aryan"
});


// =======================================================
// 🔥 9. UPDATE DATA
// =======================================================

// Update one
db.users.updateOne(
    { name: "Aryan" },
    { $set: { age: 23 } }
);

// Update many
db.users.updateMany(
    {},
    { $set: { active: true } }
);

//note
🔥 1️⃣ Basic Syntax
db.collection.updateOne(filter, update)
db.collection.updateMany(filter, update)

👉 Both take 2 main arguments:

🟢 1. Filter (Which documents?)
{ name: "Aryan" }

👉 Means:
"Find documents where name = Aryan"
🟢 2. Update (What to change?)
{ $set: { age: 23 } }

👉 Means:
"Set age = 23"
🔥 2️⃣ Your First Code (updateOne)
db.users.updateOne(
    { name: "Aryan" },
    { $set: { age: 23 } }
);
🧠 What Happens?
👉 Step-by-step:
Find first document where:

name === "Aryan"
Update ONLY that one document
🟢 Example Before
[
  { "name": "Aryan", "age": 22 },
  { "name": "Aryan", "age": 25 }
]
🟢 After updateOne
[
  { "name": "Aryan", "age": 23 },  // updated
  { "name": "Aryan", "age": 25 }   // unchanged
]
🔥 3️⃣ Your Second Code (updateMany)
db.users.updateMany(
    {},
    { $set: { active: true } }
);
🧠 What Happens?

👉 Step-by-step:
Filter:
{}

👉 Means:
"Select ALL documents"
Update ALL of them
🟢 Result
[
  { "name": "Aryan", "age": 23, "active": true },
  { "name": "Rahul", "age": 25, "active": true }
]
🔥 Difference Between updateOne vs updateMany
Feature	updateOne	updateMany
Documents affected	Only FIRST match	ALL matches
Use case	Update single user	Bulk update
Performance	Faster	Slower (more docs)
🧠 Important Concept: $set
❓ Why $set?
{ $set: { age: 23 } }

👉 Means:

"Update only this field"
❌ Without $set
db.users.updateOne(
    { name: "Aryan" },
    { age: 23 }
);

👉 This will:
💥 Replace entire document

🧠 Example
Before:
{ "name": "Aryan", "age": 22 }
After:
{ "age": 23 }   ❌ name lost
🔥 Other Update Operators (Important)
🟢 Increment
{ $inc: { age: 1 } }
🟢 Add field
{ $set: { city: "Kolkata" } }
🟢 Remove field
{ $unset: { age: "" } }

// =======================================================
// 🔥 10. DELETE DATA
// =======================================================

// Delete one
db.users.deleteOne({ name: "Amit" });

// Delete many
db.users.deleteMany({ age: { $lt: 25 } });


// =======================================================
// 🔥 11. IMPORTANT OPERATORS
// =======================================================

// $set → update fields
// $gt → greater than
// $lt → less than
// $in → match multiple values

db.users.find({
    name: { $in: ["Aryan", "Rahul"] }
});


// =======================================================
// 🔥 12. PROJECTION (SELECT FIELDS)
// =======================================================

// Show only name
db.users.find({}, { name: 1, _id: 0 });


// =======================================================
// 🔥 13. SORTING
// =======================================================

// Ascending
db.users.find().sort({ age: 1 });

// Descending
db.users.find().sort({ age: -1 });


// =======================================================
// 🔥 14. LIMIT
// =======================================================

db.users.find().limit(2);


// =======================================================
// 🔥 15. REAL BACKEND CONNECTION (IMPORTANT)
// =======================================================

// Current (your project):
// users = [] ❌

// Future:
// MongoDB collection ✅


// =======================================================
// 🔥 16. COMMON INTERVIEW QUESTIONS
// =======================================================

// Q1: Difference between SQL and MongoDB?
// → SQL: tables, fixed schema
// → MongoDB: JSON, flexible schema

// Q2: What is a document?
// → JSON-like object

// Q3: What is collection?
// → Group of documents

// Q4: What is _id?
// → Unique identifier (auto-generated)


// =======================================================
// 🔥 17. VERY IMPORTANT CONCEPTS
// =======================================================

// 1. MongoDB auto adds _id
// Example:
{
    _id: ObjectId("abc123"),
    name: "Aryan"
}

// 2. No schema (but we use Mongoose later)

// 3. Data stored in BSON (binary JSON)


// =======================================================
// 🔥 18. COMMON MISTAKES
// =======================================================

// ❌ Forgetting $set in update
// ❌ Thinking MongoDB = SQL
// ❌ Not understanding query operators


// =======================================================
// 🔥 19. FINAL SUMMARY
// =======================================================

// You learned:
// ✔ MongoDB structure
// ✔ CRUD operations
// ✔ Query operators
// ✔ Sorting, limit, projection
// ✔ Real backend usage

