const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

//Init app 
const app = express();

// Setting port
const PORT = process.env.port || 3000;

//Create Redis client
let client = require('./dbClient');
client.on("error", (err) => {
    console.error(err)
})

//Body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set up View Engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Method override
app.use(methodOverride('_method'));

//Search Page
app.get('/', (req,res) => res.send("hello world"));

//Listening on port
const server =  app.listen(PORT, function(){
    console.log('Server started on port ' + PORT);
});

module.exports = server;