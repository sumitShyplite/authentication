const express = require("express")
const bcrypt = require("bcryptjs")

require("./dbconnection")
const ejs = require("ejs")
const mysql = require("mysql")

const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
const urlencodedParser = bodyParser.urlencoded({extended:false})

app.use(cookieParser())
app.set("view engine","ejs")
app.set("views","./view")

const controller = require('./controller')

let MySQLStore = require("express-mysql-session")(session)

let connection = {
  host: 'sql6.freesqldatabase.com',
  user: 'sql6445341',
  password: '7U4vlnIgXs',
  database: 'sql6445341',
  port:'3306'

}

// connection.connect((err) => {
//     if (err) throw err;
//     connection.query("SELECT * FROM pincodes", function (err, rows, fields) {
//       if (err) throw err;
//       console.log(rows);
//     });
//   });



//session
let sessionStore = new MySQLStore(connection)

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
            ans: [],
            data: undefined
        })
    }
    res.redirect("/login")
})

app.get("/register",(req,res) =>{
    res.render("signup")
})
app.post("/register",urlencodedParser,controller.register)


app.get("/logout",controller.logout)

app.get("/priceform",controller.form)
app.post("/price",controller.pin)

app.get("/apiform",controller.apiform)
app.post("/post",urlencodedParser,controller.price)

app.listen(3000,() =>{
    console.log("server is running on port 3000")
})
