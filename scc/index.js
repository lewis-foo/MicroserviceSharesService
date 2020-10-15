let express = require("express");
let app = express();
let shares = require("./routes/shares");
let bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/shares", shares);

let server = app.listen(8000, function () {

});



