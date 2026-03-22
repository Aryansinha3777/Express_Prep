// =======================================================
// 🔥 1. WHAT IS ROUTING?
// =======================================================

// Routing = deciding which code runs for a specific request

// Based on:
// - URL (req.url)
// - HTTP Method (GET, POST, etc)

// Example:
// GET /users → get all users
// POST /users → create user


// =======================================================
// 🔥 2. BASIC ROUTES
// =======================================================

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});


// =======================================================
// 🔥 3. MULTIPLE HTTP METHODS
// =======================================================

app.post("/users", (req, res) => {
    res.send("Create user");
});

app.put("/users", (req, res) => {
    res.send("Update user");
});

app.delete("/users", (req, res) => {
    res.send("Delete user");
});

//note
🔥 Step-by-Step Execution (REAL FLOW)
Let’s say a client (browser/Postman) sends:

POST /users
🟢 Step 1 — Request Comes In
Client → Express server

Internally:
http.createServer(app)
👉 Express is connected to Node’s HTTP server.

🟢 Step 2 — Express Receives Request
Now Express gets:
req.url = "/users"
req.method = "POST"
🟢 Step 3 — Express Checks Routes
When you wrote:
app.post("/users", callback)

Express internally stored something like:

[
  {
    method: "POST",
    path: "/users",
    handler: callback
  }
]
🟢 Step 4 — Matching Happens
Express checks:
Is there a route with:
method = POST
path = /users ?
👉 YES ✅

🟢 Step 5 — Callback Is Called
Now Express does:
callback(req, res);

Which means:
(req, res) => {
    res.send("Create user");
}
👉 This function is executed NOW.

🟢 Step 6 — Response Sent
res.send("Create user");
This sends response back to client.

🔥 WHO CALLS THE CALLBACK?
👉 Express calls it
NOT you
NOT browser
👉 Express decides:

// =======================================================
// 🔥 4. ROUTE PARAMETERS (DYNAMIC ROUTES) 🔥
// =======================================================

// Used when URL contains dynamic values

app.get("/users/:id", (req, res) => {
    console.log(req.params);

    res.send(`User ID is ${req.params.id}`);
});


// 🧠 Example:
// URL → /users/101

// req.params = { id: "101" }

// Output:
// User ID is 101

//notes
🧠 What is :id?
👉 :id is a route parameter (dynamic value)

It means:
“This part of the URL can be anything”

🔥 Example Request
If client hits:
GET /users/101

Then Express interprets:
/users/:id
as:
/users/101
🧠 What Express Does Internally
When you define:
app.get("/users/:id", handler)
Express stores a pattern:
/users/{something}
🔥 Matching Process
Request comes:
/users/101
Express checks:
Does it match /users/:id ?
👉 YES ✅
🟢 Step 1 — Extract Value
Express extracts:
id = "101"
🟢 Step 2 — Store in req.params
req.params = {
    id: "101"
}
🟢 Step 3 — Your Code Runs
console.log(req.params);
Output:
{ id: "101" }
🟢 Step 4 — Send Response
res.send(`User ID is ${req.params.id}`);
Output:
User ID is 101
🔥 Try More Examples
URL:
/users/500

Output:
User ID is 500
URL:
/users/abc
Output:
User ID is abc
👉 Because :id accepts ANY value.
🧠 Important Concept
👉 req.params always gives strings
Even if:
/users/101
Then:
typeof req.params.id // "string"
🔥 Multiple Params Example
app.get("/users/:id/orders/:orderId", (req, res) => {
    console.log(req.params);
});
URL:
/users/10/orders/500
Output:
{
  id: "10",
  orderId: "500"
}
🧠 When Do We Use Params?
👉 When identifying a specific resource
Examples:
GET /users/10       → specific user
GET /products/5     → specific product
GET /orders/200     → specific order
🔥 Param vs Query (Important)
Param:
/users/10
Query:
/users?id=10

👉 Both send data, but:
Param	Query
Required	Optional
Used for identity	Used for filtering
🎯 Interview Question
Q: What is req.params?
Answer:
It is an object containing route parameters extracted from the URL.

🧠 Real Backend Example
app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

👉 This is used in real APIs.
    
// =======================================================
// 🔥 5. MULTIPLE PARAMS
// =======================================================

app.get("/users/:id/orders/:orderId", (req, res) => {
    console.log(req.params);

    res.send(`User ${req.params.id}, Order ${req.params.orderId}`);
});


// Example:
// /users/10/orders/500

// req.params = {
//   id: "10",
//   orderId: "500"
// }


// =======================================================
// 🔥 6. QUERY PARAMETERS 🔥
// =======================================================

// Used for filtering / searching

app.get("/search", (req, res) => {
    console.log(req.query);
    
    res.send("Check console for query params");
});


// 🧠 Example URL:
// /search?name=aryan&age=22

// req.query = {
//   name: "aryan",
//   age: "22"
// }


// =======================================================
// 🔥 7. PARAM vs QUERY (IMPORTANT)
// =======================================================

// PARAMS:
// /users/:id
// Used for identifying specific resource

// QUERY:
// /users?age=22
// Used for filtering/searching


// =======================================================
// 🔥 8. ROUTE ORDER MATTERS ⚠️
// =======================================================

// ❌ WRONG ORDER:

app.get("/users/:id", (req, res) => {
    res.send("Dynamic route");
});

app.get("/users/profile", (req, res) => {
    res.send("Profile page");
});

// If you visit /users/profile
// It will match /users/:id → id = "profile"


// ✔ CORRECT ORDER:

app.get("/users/profile", (req, res) => {
    res.send("Profile page");
});

app.get("/users/:id", (req, res) => {
    res.send("Dynamic route");
});

// =======================================================
// 🔥 9. CHAINING ROUTES (CLEAN STYLE)                    
// =======================================================

app.route("/products")
    .get((req, res) => res.send("Get all products"))
    .post((req, res) => res.send("Create product"));

 
// =======================================================
// 🔥 10. WILDCARD ROUTE (404 HANDLER)
// =======================================================

app.use((req, res) => {
    res.status(404).send("Route not found");
});


// =======================================================
// 🔥 11. START SERVER
// =======================================================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


// =======================================================
// 🔥 12. INTERVIEW QUESTIONS
// =======================================================

// Q1: Difference between req.params and req.query?
// → params for URL values, query for filters

// Q2: What is dynamic routing?
// → Routes with variables like /users/:id

// Q3: Why does route order matter?
// → Express matches routes top to bottom

// Q4: What is wildcard route?
// → A route that handles all unmatched requests (404)


// =======================================================
// 🔥 13. REAL BACKEND INSIGHT
// =======================================================

// Real API examples:

// GET /users           → get all users
// GET /users/10        → get user with ID 10
// GET /users?age=22    → filter users

// This is how real backend APIs are designed.


// =======================================================
// 🔥 14. FINAL SUMMARY
// =======================================================

// You learned:
// ✔ Routing basics
// ✔ HTTP methods
// ✔ Route params
// ✔ Query params
// ✔ Route order importance
// ✔ 404 handling

// Next → Middleware Deep Dive (MOST IMPORTANT)

