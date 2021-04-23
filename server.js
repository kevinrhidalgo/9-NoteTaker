// bring in express
const express = require("express");
const path = require("path");

//create an instance of express and define a port
const app = express();
//process.env  is what helps locate the heroku server
const PORT = process.env.PORT|| 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'));

require("./routes/apiRoutes")(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));