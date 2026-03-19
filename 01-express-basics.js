// =======================================================
// 🔥 1. WHAT IS EXPRESS?
// =======================================================

// Express is a minimal web framework for Node.js
// It simplifies:
// - Routing
// - Request handling
// - Response sending
// - Middleware usage

// Without Express (Node HTTP):
// if (req.url === "/users" && req.method === "GET") { ... }

// With Express:
/// app.get("/users", handler)

// =======================================================
// 🔥 2. INSTALL & SETUP
// =======================================================

// Step 1: npm init -y
// Step 2: npm install express

// Import express
const express = require("express");

// Create app
const app = express();

//note
🧠 What is express here?
const express = require("express");
👉 express is actually a function, not an object.
So when you do:
express()
You are calling that function.
🔥 What Does express() Return?

It returns:
👉 An application object (app)
This app is your main server controller.
Think:

express() → gives you → app
🧠 What is app?
app is an object that:
Handles requests
Stores routes
Manages middleware
Sends responses
It is basically your entire backend application

🔥 Why Do We Need It?
Because everything in Express is done through app.
Without app, you cannot:

❌ define routes
❌ use middleware
❌ start server

🧩 Example
app.get("/", (req, res) => {
    res.send("Hello");
});

Here:
app stores this route internally
When request comes → Express checks app → finds matching route

🔥 What Happens Internally
When you write:
const app = express();
Internally Express:
Creates an object

Attaches methods like:
get()
post()
use()
listen()
Prepares routing system
Prepares middleware system

🧠 Real Analogy
Think:
express() = factory
app = machine produced by factory

Now you use that machine:

app.get(...)
app.post(...)
app.listen(...)
🔥 Compare With Node HTTP
Node:
const server = http.createServer((req, res) => {});
Express:
const app = express();
app.get("/", handler);
app.listen(3000);

👉 app is like a better version of server

🔥 Important Detail
app itself is actually a function internally.
That’s why Express can pass it to HTTP server like:
http.createServer(app);
Yes 😳 — app is callable.

🎯 Interview Question
Q: What does express() return?
Strong answer:
It returns an application instance that is used to define routes, middleware, and handle HTTP requests.

// =======================================================
// 🔥 3. BASIC SERVER
// =======================================================

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

// 🧠 OUTPUT:
// Open browser → http://localhost:3000
// Hello from Express!

// =======================================================
// 🔥 4. UNDERSTANDING req & res
// =======================================================

app.get("/info", (req, res) => {
    console.log(req.method); // GET
    console.log(req.url);    // /info

    res.send("Check console for request info");
});


// =======================================================
// 🔥 5. res.send() vs res.json()
// =======================================================

// res.send → sends string / html / buffer
app.get("/send", (req, res) => {
    res.send("This is a normal response");
});

// res.json → sends JSON (automatically stringifies)
app.get("/json", (req, res) => {
    res.json({ message: "This is JSON response" });
});


// 🧠 IMPORTANT:
// res.json() internally does:
// JSON.stringify() + sets Content-Type = application/json

// =======================================================
// 🔥 6. HANDLING POST REQUEST (WITH JSON)
// =======================================================

// Middleware to parse JSON
app.use(express.json());

app.post("/data", (req, res) => {
    console.log(req.body); // Already parsed object

    res.status(201).json({
        message: "Data received successfully",
        data: req.body
    });
});


// 🧠 WHAT EXPRESS DID FOR YOU:
// - Collected chunks
// - Parsed JSON
// - Attached to req.body
// (Previously we did manually)

//note
🧠 Step 1 — What is app.use(express.json())?

👉 This is middleware.
It means:
“Before any route runs, parse incoming JSON body.”

🔥 What problem does it solve?
In Node (without Express), we had to do:

req.on("data", ...)
req.on("end", ...)
JSON.parse(body)

But now:
👉 Express does ALL of that for you.

🧠 What it actually does internally:
Incoming request
        ↓
Collect chunks
        ↓
Convert to string
        ↓
JSON.parse()
        ↓
Attach to req.body

So after this middleware:
req.body = parsed JavaScript object
🔥 Step 2 — POST Route
app.post("/data", (req, res) => {

This means:
Handle POST requests to /data

🧠 When will this run?
When client sends:
POST /data

Example using Postman:
{
  "name": "Aryan",
  "age": 22
}
🔥 Step 3 — Accessing Data
console.log(req.body);

Now you directly get:
{ name: "Aryan", age: 22 }
No parsing needed 😎

🔥 Step 4 — Sending Response
res.status(201).json({
    message: "Data received successfully",
    data: req.body
});
🧠 What happens here?
1️⃣ res.status(201)
Sets HTTP status code → 201
Means:“Resource created”

2️⃣ .json({...})
Converts object → JSON string
Sets header → Content-Type: application/json
Sends response

✅ Final Response Sent:
{
  "message": "Data received successfully",
  "data": {
    "name": "Aryan",
    "age": 22
  }
}
🔥 Full Flow (VERY IMPORTANT)
Client sends POST request with JSON
        ↓
express.json() middleware runs
        ↓
Body is parsed and attached to req.body
        ↓
Route handler runs
        ↓
You access req.body
        ↓
Send response using res.json()
🔥 What If You Remove Middleware?

If you remove:
app.use(express.json());

Then:
req.body → undefined ❌
Because Express will NOT parse the body.

🧠 Golden Rule
Incoming JSON → express.json() → req.body
Outgoing Object → res.json() → JSON
🎯 Interview Questions
Q1: What does express.json() do?
👉 Parses incoming JSON request body and attaches it to req.body.

Q2: What happens if you don’t use it?
👉 req.body will be undefined.

Q3: Difference between res.send() and res.json()?
👉 res.json() automatically converts object to JSON and sets headers.

// =======================================================
// 🔥 7. STATUS CODES IN EXPRESS
// =======================================================

app.get("/status", (req, res) => {
    res.status(200).send("OK");
});

app.get("/created", (req, res) => {
    res.status(201).send("Created");
});

app.get("/notfound", (req, res) => {
    res.status(404).send("Not Found");
});


// =======================================================
// 🔥 8. MULTIPLE ROUTES EXAMPLE
// =======================================================

app.get("/home", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});


// =======================================================
// 🔥 9. IMPORTANT DIFFERENCE (NODE vs EXPRESS)
// =======================================================

// Node HTTP:
// - Manual routing
// - Manual JSON parsing
// - Manual headers

// Express:
// - Built-in routing
// - Built-in middleware
// - Cleaner syntax


// =======================================================
// 🔥 10. COMMON BEGINNER MISTAKE
// =======================================================

// ❌ WRONG:
app.get("/wrong", (req, res) => {
    return "Hello"; // DOES NOT SEND RESPONSE
});

// ✔ CORRECT:
app.get("/correct", (req, res) => {
    res.send("Hello");
});


// =======================================================
// 🔥 11. REQUEST FLOW (VERY IMPORTANT)
// =======================================================

// Client → Request → Express App → Route Handler → Response

// Example:
// Browser → GET /home → app.get("/home") → res.send()


// =======================================================
// 🔥 12. INTERVIEW QUESTIONS
// =======================================================

// Q1: What is Express?
// → A minimal web framework built on Node.js for handling routing and middleware.

// Q2: Difference between res.send() and res.json()?
// → res.json automatically converts object to JSON and sets headers.

// Q3: What does express.json() do?
// → Middleware that parses incoming JSON request body.

// Q4: Why use Express over Node http?
// → Cleaner syntax, built-in routing, middleware support.


// =======================================================
// 🔥 13. REAL BACKEND INSIGHT
// =======================================================

// Express internally:
// - Uses Node http module
// - Matches routes
// - Handles req/res
// - Manages middleware chain

// So Express is NOT magic — just abstraction.


// =======================================================
// 🔥 14. FINAL SUMMARY
// =======================================================

// You learned:
// ✔ Express setup
// ✔ Basic routing
// ✔ req & res
// ✔ JSON handling
// ✔ Status codes
// ✔ Difference from Node HTTP

// Next → Routing Deep Dive

