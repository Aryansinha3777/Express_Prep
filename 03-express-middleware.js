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

//note
🔥 Key Idea
👉 next() does NOT magically know about second
👉 It just says:
"Go to the NEXT registered middleware"
🧠 Who decides the “next”?
👉 Express decides, based on the order you REGISTER middleware.
🔥 What app.use() Actually Does
When you write
app.use(first);
app.use(second);
Express internally builds a list:

[
  first,
  second,
  routeHandler("/")
]
🔥 Now Execution Flow
When request comes:

GET /
Step 1:
Run first

console.log("First middleware");
next();
👉 next() means:

"Run the next function in the list"
Step 2:
Run second

console.log("Second middleware");
next();
Step 3:
Run route handler

res.send("Home");
🔥 IMPORTANT TRUTH

👉 first does NOT know second exists
👉 second does NOT come from first

👉 Both are independent, just arranged in order

🧠 What if you remove app.use(second)?
app.use(first);
// app.use(second); ❌ removed

Then flow becomes:
first → route handler

Output:
First middleware
Home
👉 second will NEVER run

🔥 Analogy
Think of middleware like a queue:
[ first ] → [ second ] → [ route ]
next() = “move forward in queue”

🔥 Common Misunderstanding
❌ Wrong thinking:
first → directly calls second
✅ Correct thinking:

Express controls flow
first → next() → Express → second
🎯 Interview Answer

Q: What does next() do?
Strong answer:
It passes control to the next middleware function in the request-response cycle as defined by Express.

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

🧠 Final Mental Model
app.use(express.json());

means:
"From now on, whenever JSON comes, parse it"

express.json()        // parse JSON body
express.urlencoded()  // parse form data

//note
🎯 MCQ Trick Rule
Remember this:
Input to res.json()	
Output
object	JSON object
null	    null
undefined	null ✅
string	    string
🧠 Golden Rule for Exams
res.json(undefined) → null
🔥 One More Trick Question
res.json()
👉 Also:
null
🧠 Final Mental Model
req.body = undefined
        ↓
res.json(undefined)
        ↓
Express converts it
        ↓
null
🎯 Interview Answer

Q: What happens if req.body is undefined and we use res.json()?
Express sends null because undefined is not a valid JSON value.


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

// for 4
🔥 4️⃣ Error-Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).send("Error occurred");
});
🧠 Purpose:
👉 Catch and handle errors globally
🔥 Why we need it?

Without this:
Server crashes
Unhandled errors
Bad user experience
🧩 Example:
app.get("/error", (req, res, next) => {
    next(new Error("Something broke"));
});

👉 Goes to error middlewar
🎯 When to Use
👉 Always in production apps

🔥 1️⃣ This One (Creates Error)
app.get("/error", (req, res, next) => {
    next(new Error("Something broke"));
});
🧠 Purpose:

👉 Generate / pass an error

This is a normal route handler
You are saying:
"Something went wrong → pass it to error handler"
🔥 2️⃣ This One (Handles Error)
app.use((err, req, res, next) => {
    res.status(500).send("Error occurred");
});
🧠 Purpose:

👉 Catch and handle errors

This is error-handling middleware
It runs ONLY when next(err) is called
🔥 How They Work Together
Step-by-step flow:
Client → GET /error
        ↓
Route runs
        ↓
next(new Error(...))
        ↓
Express skips normal middleware
        ↓
Goes directly to error middleware
        ↓
Error response sent
🧠 Full Example (IMPORTANT)
const express = require("express");
const app = express();

// Route that creates error
app.get("/error", (req, res, next) => {
    next(new Error("Something broke"));
});

// Error handler (must be last)
app.use((err, req, res, next) => {
    console.log(err.message);

    res.status(500).send("Error occurred");
});

app.listen(3000);
🔥 Output

Visit:
http://localhost:3000/error

Console:
Something broke

Browser:
Error occurred
🧠 VERY IMPORTANT RULES
✅ Rule 1: Error middleware has 4 params
(err, req, res, next)

👉 This tells Express:
“This is an error handler”
✅ Rule 2: It must be defined LAST
app.use(errorHandler); // always at bottom
✅ Rule 3: Use next(err) to trigger it
🔥 Common Mistake
❌ Thinking this handles error:
app.get("/error", (req, res) => {
    throw new Error("Oops");
});
👉 This may crash server (in some cases)
🎯 Interview Answer
Q: Difference between next(err) and error middleware?
next(err) is used to pass error, and error middleware handles it globally.

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

//note
🔥 Your Code
app.get("/error", (req, res, next) => {
    const err = new Error("Something went wrong");
    next(err);
});
🧠 Why next Exists Here?
Because:
👉 This function is still part of Express request pipeline
Whether it's:
app.use() → middleware
app.get() → route handler

👉 Both can receive:
(req, res, next)
🔥 Key Idea
👉 Route handler is also a type of middleware

Yes 😳
Internally, Express treats this:
app.get("/error", handler)
like:
"middleware attached to a specific route"

//note
🧠 Important Insight
You don’t always need next in route handler.

Normal case:
app.get("/", (req, res) => {
    res.send("Home");
});

👉 No next() needed because response is sent.
Error case:
app.get("/error", (req, res, next) => {
    next(new Error("Error"));
});

👉 You need next(err) to pass error.
🔥 Common Pattern (Production)
app.get("/user", async (req, res, next) => {
    try {
        const user = await getUser();
        res.json(user);
    } catch (err) {
        next(err); // pass error
    }
});


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

