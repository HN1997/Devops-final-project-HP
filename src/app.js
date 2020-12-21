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

app.get('/', (req, res) => res.send('Hello World!'))

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

//app.use('/user', userRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
