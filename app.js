const express = require("express")
require("./dbconnection")
const ejs = require("ejs")

const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use(cookieParser())
//app.use(session({

//}))

app.set("view engine","ejs")
app.set("views","./view")

let MySQLStore = require("express-mysql-session")(session)

let connection = {
    host: 'sql6.freesqldatabase.com',
  user: 'sql6443877',
  password: 'J8qDiDJp3j',
  database: 'sql6443877',
  port:'3306'

}

//session
let sessionStore = new MySQLStore(connection)

app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}))


//routes
app.get("/",(req,res) =>{
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

app.post("/login",async (req,res) =>{
    const{email,password} = req.body
    console.log("req.body=====",req.body)
    const user = await query(`SELECT name,password FROM user WHERE email ='${email}' AND password = '${password}'`)
    if(user.length){
        req.session.isAuth = true
        req.session.name = user[0].name
        return res.redirect("/home")
    }
    return res.redirect('/login')
})

app.get("/home",(req,res)=>{
    console.log("req.session------",req.session)
    if(req.session.isAuth){
        return res.render("home",{
            name:req.session.name
        })
    }
    res.redirect("/login")
})

app.get("/register",(req,res) =>{
    res.render("signup")
})

app.post("/register",async(req,res) =>{
    await query (`INSERT INTO user SET ?;`,req.body)
    return res.redirect("/login")
})

app.get("/logout",async(req,res)=>{
    req.session.destroy(() =>{
        return res.redirect("/login")
    })
})

//app.use("/",require("./routes"))


app.listen(3000,() =>{
    console.log("server is running on port 3000")
})
