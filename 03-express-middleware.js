// =======================================================
// 🔥 1. WHAT IS MIDDLEWARE?
// =======================================================

// Middleware = function that runs BETWEEN request and response

// Flow:
// Client → Middleware → Route Handler → Response

// It can:
// - Modify request
// - Modify response
// - Stop request
// - Pass control


// =======================================================
// 🔥 2. BASIC MIDDLEWARE
// =======================================================

const express = require("express");
const app = express();

function logger(req, res, next) {
    console.log("Request received:", req.method, req.url);

    next(); // VERY IMPORTANT
}

app.use(logger);


// 🧠 What happens:
// Every request will first go to logger middleware


// =======================================================
// 🔥 3. UNDERSTANDING next() 🔥
// =======================================================

// next() → passes control to next middleware or route

function first(req, res, next) {
    console.log("First middleware");
    next();
}

function second(req, res, next) {
    console.log("Second middleware");
    next();
}

app.use(first);
app.use(second);

app.get("/", (req, res) => {
    res.send("Home");
});


// 🧠 OUTPUT when hitting "/":
// First middleware
// Second middleware
// Home


// =======================================================
// 🔥 4. WHAT IF YOU DON'T CALL next() ❌
// =======================================================

function block(req, res, next) {
    console.log("Blocking middleware");

    // next() NOT CALLED
}

app.use("/block", block);

app.get("/block", (req, res) => {
    res.send("You will never reach here");
});


// 🧠 RESULT:
// Request hangs forever (no response)


// =======================================================
// 🔥 5. BUILT-IN MIDDLEWARE
// =======================================================

// Parse JSON
app.use(express.json());

app.post("/data", (req, res) => {
    res.json(req.body);
});


// =======================================================
// 🔥 6. CUSTOM MIDDLEWARE (REAL USE)
// =======================================================

// Example: Authentication check

function auth(req, res, next) {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return res.status(401).send("Unauthorized");
    }

    next();
}

app.get("/dashboard", auth, (req, res) => {
    res.send("Welcome to dashboard");
});


// 🧠 Flow:
// Request → auth → if allowed → route


// =======================================================
// 🔥 7. MIDDLEWARE TYPES
// =======================================================

// 1. Application-level → app.use()
// 2. Route-level → app.get("/path", middleware, handler)
// 3. Built-in → express.json()
// 4. Error-handling → (err, req, res, next)


// =======================================================
// 🔥 8. MULTIPLE MIDDLEWARE IN ROUTE
// =======================================================

function m1(req, res, next) {
    console.log("M1");
    next();
}

function m2(req, res, next) {
    console.log("M2");
    next();
}

app.get("/multi", m1, m2, (req, res) => {
    res.send("Final Handler");
});


// 🧠 OUTPUT:
// M1
// M2
// Final Handler


// =======================================================
// 🔥 9. REQUEST FLOW (VERY IMPORTANT)
// =======================================================

// Client → app.use() middleware → route middleware → handler → response


// =======================================================
// 🔥 10. REAL BACKEND USE CASES
// =======================================================

// Middleware is used for:
// - Authentication (JWT)
// - Logging
// - Validation
// - Error handling
// - Parsing body


// =======================================================
// 🔥 11. INTERVIEW QUESTIONS
// =======================================================

// Q1: What is middleware?
// → Function that runs between request and response.

// Q2: What is next()?
// → Function to pass control to next middleware.

// Q3: What happens if next() is not called?
// → Request will hang.

// Q4: Types of middleware?
// → Application, Route, Built-in, Error-handling.


// =======================================================
// 🔥 12. FINAL SUMMARY
// =======================================================

// You learned:
// ✔ Middleware concept
// ✔ next()
// ✔ Built-in middleware
// ✔ Custom middleware
// ✔ Request flow

// Next → Build full CRUD API

////ADVANCE////

// =======================================================
// 🔥 13. ERROR HANDLING MIDDLEWARE (VERY IMPORTANT)
// =======================================================

app.get("/error", (req, res, next) => {
    const err = new Error("Something went wrong");
    next(err); // Pass error to middleware
});

// Error middleware (must have 4 params)
app.use((err, req, res, next) => {
    console.log("Error:", err.message);

    res.status(500).json({
        message: "Internal Server Error"
    });
});


// 🧠 IMPORTANT:
// Only error middleware catches errors passed via next(err)


// =======================================================
// 🔥 14. MIDDLEWARE ORDER MATTERS ⚠️
// =======================================================

function order1(req, res, next) {
    console.log("Order 1");
    next();
}

function order2(req, res, next) {
    console.log("Order 2");
    next();
}

app.use(order1);
app.use(order2);

app.get("/order", (req, res) => {
    res.send("Check order in console");
});


// 🧠 OUTPUT:
// Order 1
// Order 2


// =======================================================
// 🔥 15. DO NOT SEND RESPONSE + CALL next() ❌
// =======================================================

app.get("/wrong-flow", (req, res, next) => {
    res.send("Response sent");

    // next(); ❌ NEVER DO THIS
});

// 🧠 Why?
// Response already sent → next middleware may crash


// =======================================================
// 🔥 16. SHORT-CIRCUITING (STOPPING REQUEST)
// =======================================================

function checkAuth(req, res, next) {
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return res.status(401).send("Access Denied");
    }

    next();
}

app.get("/private", checkAuth, (req, res) => {
    res.send("Private Data");
});


// 🧠 Flow:
// If not logged in → request stops here
// Route handler never runs


// =======================================================
// 🔥 17. COMPLETE REQUEST FLOW (FINAL UNDERSTANDING)
// =======================================================

// Client
//   ↓
// Global Middleware (app.use)
//   ↓
// Route Middleware
//   ↓
// Route Handler
//   ↓
// Response sent
//   ↓
// (Optional) Error Middleware


// =======================================================
// 🔥 18. FINAL INTERVIEW INSIGHT
// =======================================================

// Middleware is just:
// (req, res, next) => {}


// But power comes from:
// ✔ Order
// ✔ next()
// ✔ Ability to stop or modify flow


// =======================================================
// 🔥 FINAL VERDICT
// =======================================================

// Now your middleware knowledge is:

// ✔ Interview-ready
// ✔ Project-ready
// ✔ Production-level understanding

