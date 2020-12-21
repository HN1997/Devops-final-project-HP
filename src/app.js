const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const userRouter = require('./routes/user');

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

app.get('/', (req,res) => res.send('hello world'));

app.use('/user', userRouter);

//Listening on port
const server =  app.listen(PORT, function(){
    console.log('Server started on port ' + PORT);
});

module.exports = server;