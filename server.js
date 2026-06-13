const express = require("express");

const webRouter = require("./modules/routes/web.js");
const apiRouter = require("./modules/routes/api");

global.config = require("./modules/config");

const app = express();

//we should define the middleware before defining the routes,
//because the middleware will be executed before the routes.
//So we need to define the middleware first, then define the routes.

//that means express receives json data from the
//  client and parses it to a JavaScript object (form-data)
app.use(express.urlencoded({ extended: false }));

//by default, express does not understand json data sent by the client.
//So we need to use the express.json() middleware to parse the json data
// and make it available in req.body
app.use(express.json({ type: "application/json" }));

//to use api routes,
app.use("/api", apiRouter);

//to use web routes,
// we need to use the webRouter and define the base path for it.
app.use("/", webRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
