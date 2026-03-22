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

