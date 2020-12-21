const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

//Init app 
const app = express()
// Setting port
const port = process.env.PORT || 3000

const client = require('./dbClient')
client.on("error", (err) => {
  console.error(err)
})

//Body-parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//Set up View Engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.status(200).render('searchusers');
});

//Get a user
app.post('/user/search', (req, res) => {
    let id= req.body.id;
    client.hgetall(id, (err, obj) => {
        if(!obj){
            res.status(404).render('searchusers', {
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
            //console.log(reply);
            res.status(200);
            res.redirect('/');
        }
    });
});

// Delete User
app.delete('/user/delete/:id', (req, res) => {
    client.del(req.params.id, (err, reply) =>{
        if(err){
            res.status(404);
            console.log(err);
        }
        if(reply){
            res.status(201);
        } else {
            res.status(404);
        }
    });
    res.render('searchusers');
});

// Update User
app.post('/user/update/:id', (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let phone = req.body.phone;
    let email = req.body.email;

    //Get the user first
    let id= req.params.id;
    client.hgetall(id, (err, obj) => {
        //If user does not exist
        if(!obj){
            res.status(404).render('searchusers', {
                error: 'User does not exist'
            });
        }
        //If user does exist
        else {
            client.hmset(id, [
                'first_name', first_name,
                'last_name', last_name,
                'email', email,
                'phone', phone,
            ], (err, reply) => {
                if(err){
                    console.log(err);
                } 
                if(reply){
                    res.status(200).redirect('/');
                } else {
                    res.status(404).redirect('/');
                }
            });
        }
    })
});

//app.use('/user', userRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
