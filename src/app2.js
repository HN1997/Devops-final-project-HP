const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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
app.get('/', (req, res) => {
    res.status(200).render('searchusers');
});

//Search processing
app.post('/user/search', (req, res) => {
    let id= req.body.id;
    client.hgetall(id, (err, obj) => {
        if(!obj){
            res.render('searchusers', {
                error: 'User does not exist'
            });
        }else {
            obj.id = id;
            res.status(201).render('details', {
                user: obj
            });
        }
    })
});

//Add User Page
app.get('/user/add', (req, res) => {
    res.render('adduser');
});

// Proccess Add User Page
app.post('/user/add', (req, res) => {
    let id = req.body.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let phone = req.body.phone;
    let email = req.body.email;

    client.hmset(id, [
        'first_name', first_name,
        'last_name', last_name,
        'email', email,
        'phone', phone,
    ],(err, reply) => {
        if(err){
            console.log(err);
        } else {
            console.log(reply);
            res.status(200);
            res.redirect('/');
        }
    });
});

// Delete User
app.delete('/user/delete/:id', (req, res) => {
    client.del(req.params.id, (err, reply) =>{
        if(err){
            console.log(err);
        }
    });
    res.status(201).render('searchusers');
});

// Update User
app.post('/user/update/:id', (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let phone = req.body.phone;
    let email = req.body.email;

    client.hmset(req.params.id, [
        'first_name', first_name,
        'last_name', last_name,
        'email', email,
        'phone', phone,
    ], (err, reply) => {
        if(err){
            console.log(err);
        } else {
            console.log(reply)
            res.status(201).redirect('/');
        }
    });
});

//Listening on port
const server =  app.listen(PORT, function(){
    console.log('Server started on port ' + PORT);
});

module.exports = server;