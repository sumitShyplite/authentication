const express = require("express")
const bcrypt = require("bcryptjs")
const redis = require("redis")
const connectRedis = require('connect-redis');
console.log("comingggg");
require("./dbconnection");
const ejs = require("ejs")
const mysql = require("mysql")

const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express()

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: 'redis123'
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
const RedisStore = connectRedis(session)

app.use(bodyParser.urlencoded({extended:false}))
const urlencodedParser = bodyParser.urlencoded({extended:false})

app.use(cookieParser())
app.set("view engine","ejs")
app.set("views","./view")

const controller = require('./controller')

// let MySQLStore = require("express-mysql-session")(session)

let connection = {
  host: 'localhost',
  user: 'root',
  password: 'Sumit@123', 
  database: 'Project',
  port:'3306'

}


//session
let sessionStore = new RedisStore({ client: redisClient })

    app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}))


app.use((req, res, next)=>{ 
    console.log("seeeesssiiion====",req.session);

    next();
 });


//routes
app.get("/",(req,res) =>{
    console.log("session ===========>",req.session)
     if(req.session.isAuth){
         return res.render("home",{
             name:req.session.name
         })
     }
     res.redirect("/login")
})

app.get("/login",(req,res) =>{
    res.render("login")
})

app.post("/login",urlencodedParser,controller.login)

app.get("/home",(req,res)=>{
    console.log("req.session------",req.session)
    if(req.session.isAuth){
        return res.render("apis",{
            name:req.session.name,
            selfDevelopedAns:[],
            shypliteData: undefined,
            compareData:[],
            x: 1,
            y: 1,
            z: 1
        });
    }
    res.redirect("/login")
})

app.get("/register",(req,res) =>{
    res.render("signup")
})
app.post("/register",urlencodedParser,controller.register)


app.get("/logout",controller.logout)

app.get("/selfPriceForm",controller.selfDevelopedForm)
app.post("/selfCalculatedPrice",controller.selfDevelopedCal)
   


app.get("/shypApiForm",controller.shypApiForm)
app.post("/apiCalculatedPrice",urlencodedParser,controller.shypliteCal)

// app.get("/compareform",validator controller.compare)
app.post("/compare",urlencodedParser,controller.compare)


app.listen(3000,() =>{
    console.log("server is running on port 3000")
})
