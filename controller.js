const express = require("express")
const bcrypt = require("bcryptjs")
const bodyparser = require("body-parser")
const crypto = require("crypto");
const util = require('util');
//require('dotenv').config();
const requesting = require('request');
const { maxHeaderSize } = require("http");
// const { query } = require("express");
const { createConnection } = require("net");
const request = util.promisify(requesting);
const { db } = require('./dbconnection');
const { Console } = require("console");

const timestamp     = +new Date();
const key           = "K4OuhK0B0f4=";
const appID         = 7724; 
const sellerID      = 4225;
const secret        = new Buffer("AwUT4GSgoH4pCJFPYMnAOj34C6/7Oy92HSjCMR7C1vD0hi5GOpKPUKhfv/nOd/cZVmerneEUigg9zyLyr7dFHw==")


const login = async (req,res)=>{

    const{email,password} = req.body
    console.log(`SELECT name,password FROM user WHERE email ='${email}' AND password = '${password}'`)
    const user = await query(`SELECT name,password FROM user WHERE email='${email}' AND password='${password}'`);

    
    console.log("user=+++++++++++========>",user);
    if(user.length){
        req.session.isAuth = true
        req.session.name = user[0].name;
        return res.redirect("/home")
    }
    return res.render('in');
}

const register = async(req,res) =>{

    
await query (`INSERT INTO user SET ?;`,req.body)
    return res.redirect("/login")


}



const logout = async (req,res)=>{
    req.session.destroy(() =>{
        return res.redirect("/login")
    });
}

const selfDevelopedForm = (req,res) =>{
    if(!req.session.isAuth){
        return res.render('login');
    }
    return res.render("price",{
        ans: undefined
    });
}

const selfDevelopedCal = async(req,res) =>{
    try{
    console.log("reeeeqqqqbody",req.body);
   let sourcePin = req.body.sourcePin;
   let destinationPin = req.body.destinationPin;
   let orderType = req.body.orderType;


  let length = req.body.length;
  let width = req.body.width
  let height = req.body.height
  //let dimension  = (length*width*height)
  let weight = req.body.weight;
  let invoice = req.body.invoice;
  console.log("source pin ",sourcePin)
  console.log("destination pin ",destinationPin)
  
  console.log("weight is ------",weight)

  if(!sourcePin || !destinationPin){
    res.send("Pin is missing!!!!!");
}
if(isNaN(sourcePin) || isNaN(destinationPin)){
    res.send("Pin is in alpha")
}
if(sourcePin.length!= 6) {
    res.send('Invalid sourcePin!')
}
if(destinationPin.length !=6){
    res.send('Invalid destinationPin!')
}

   const slab = (weight/ 0.5)
  const selfDevelopedAns = [];

  const user = await query(`SELECT * FROM pincodes WHERE sourcepin='${sourcePin}' AND destinationPin='${destinationPin}'`);
  if(user.length==0)
  {
    res.send("we do not provide service to your pincode!!!!!")
  } 
  console.log("user====================>",user)
  console.log(user[0].sourcePin, user[0].destinationPin )

  


  if(user[0].sourcePin == 110041  && user[0].destinationPin == 110027){
      console.log("zone====",user[0].zone)
      selfDevelopedAns.push(`Pick Up Pin Code-> ${sourcePin}   Delivery Pin Code->${destinationPin}`);
    //   ans.push(`Pin is within city`)
    selfDevelopedAns.push(user[0].zone)
      
      if(orderType == "COD"){

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE0 - AIR(0.5kg) , ESTIMATED PRICE - ${(weight/0.5)*36+Math.max((weight/100)*2,41)} `)
        selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${(weight/0.5)*50+Math.max((weight/100)*2.5,47)}`)
        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${(weight/0.5)*33 +Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${(weight/0.5)*32 +Math.max((weight/100)*2,36)}`)
        selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE -${(weight/0.5)*49 +Math.max((weight/100)*2.5,43)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*36 +Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*33 +Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*39 +Math.max((weight/100)*2,47)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*69 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*48 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*61 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*31 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*47 + Math.max((weight/100)*2,47)}`)
        selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${(weight/1)*33 + Math.max((weight/100)*2,47)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 k;g) , ESTIMATED PRICE - ${(weight/2)*96 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*48 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*92 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${ (weight/2)*31 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${(weight/2)*82 + Math.max((weight/100)*2,36)}`)
        selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${ (weight/2)*37 + Math.max((weight/100)*2,36)}`)
        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*63 + Math.max((weight/100)*2,47)}`)
        selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*33 + Math.max((weight/100)*2,47)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*150 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*30 + Math.max((weight/100)*2,41)}`)
        selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*122 + Math.max((weight/100)*2,55)}`)
        selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*22 + Math.max((weight/100)*2,55)}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*175 + Math.max((weight/100)*2,41)}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*27 + Math.max((weight/100)*2,41)}`)

        selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*105 + Math.max((weight/100)*2,47)}`)
          
        selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*33 + Math.max((weight/100)*2,47)}`)


      }else{
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - AIR(0.5kg) , ESTIMATED PRICE -${slab*36}`);
          
        selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${slab*50}`);

        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE -${slab*33}`)

        selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${slab*32}`)

        selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE -${slab*49}`)
      
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${slab*36}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${slab*33}`)

        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${slab*39}`)

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${((slab*0.5)/1)*69}`)

        selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${((slab*0.5)/1)*48}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${((slab*0.5)/1)*61}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${((slab*0.5)/1)*31}`)

        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${((slab*0.5)/1)*47}`)

        selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*33}`)

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*96}`)

        selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*48}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*92}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*31}`)

        selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*82}`)

        selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*37}`)

        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*63}`)

        selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*33}`)

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*150}`)

        selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*30}`)

        selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*122}`)

        selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*22}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*175}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*27}`)

        selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*105}`)
          
        selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*33}`)

      }
    }
    if(user[0].sourcePin == 110058 && user[0].destinationPin == 110058){

        console.log("zone====",user[0].zone)

        selfDevelopedAns.push(`Pick Up Pin Code-> ${sourcePin}   Delivery Pin Code-> ${destinationPin}`);
        selfDevelopedAns.push(user[0].zone)
        if(orderType == "COD"){
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE0 - AIR(0.5kg) , ESTIMATED PRICE - ${(weight/0.5)*43+Math.max((weight/100)*2,41)} `)
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${(weight/0.5)*61+Math.max((weight/100)*2.5,47)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${(weight/0.5)*41 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${(weight/0.5)*33 +Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE -${(weight/0.5)*53 +Math.max((weight/100)*2.5,43)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*41 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*41 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*42 +Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*78 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*55 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*71 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*37 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*50 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${(weight/1)*35 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*114 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*55 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*107 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${ (weight/2)*37 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${(weight/2)*115 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${ (weight/2)*46 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*69 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*35 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*172 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*35 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*158 + Math.max((weight/100)*2,55)}`)
            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*29 + Math.max((weight/100)*2,55)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*208 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*33 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*125 + Math.max((weight/100)*2,47)}`)
            
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*36 + Math.max((weight/100)*2,47)}`)
  

        }else{

        
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - AIR(0.5kg) , ESTIMATED PRICE - ${slab*43}`);
        
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*61}`);

            selfDevelopedAns.push(`CARRIER - Xpress , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${slab*41}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*33}`)

            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE - ${slab*53}`)
    
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*41}`)

            selfDevelopedAns.push(`CARRIER - Express , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*41}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*42}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*78}`)

            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*55}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*71}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*37}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*50}`)

            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*35}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*114}`)

            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*55}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*107}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*37}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*115}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*46}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*69}`)

            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*35}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*172}`)

            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*35}`)

            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*158}`)

            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*29}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*208}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*33}`)

            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*125}`)
        
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*36}`)


        }
    
    }

    if(user[0].sourcePin == 400001 && user[0].destinationPin == 400009){

        console.log("zone====",user[0].zone)

        selfDevelopedAns.push(`Pick Up Pin Code-> ${sourcePin}   Delivery Pin Code-> ${destinationPin}`);
        selfDevelopedAns.push(user[0].zone)
        if(orderType == "COD"){
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE0 - AIR(0.5kg) , ESTIMATED PRICE - ${(weight/0.5)*55+Math.max((weight/100)*2,41)} `)
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${(weight/0.5)*69+Math.max((weight/100)*2.5,47)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${(weight/0.5)*48 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${(weight/0.5)*56 +Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE -${(weight/0.5)*58 +Math.max((weight/100)*2.5,43)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*49 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*43 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*53 +Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*80 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*64 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*83 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*40 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*61 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${(weight/1)*43 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*131 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*64 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*123 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${ (weight/2)*40 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${(weight/2)*130 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${ (weight/2)*55 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*80 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*43 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*193 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*37 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*198 + Math.max((weight/100)*2,55)}`)
            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*36 + Math.max((weight/100)*2,55)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*232 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*36 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*156 + Math.max((weight/100)*2,47)}`)
            
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*51 + Math.max((weight/100)*2,47)}`)
  

        }else{

        

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - AIR(0.5kg) , ESTIMATED PRICE - ${slab*55}`);
        
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*69}`);

            selfDevelopedAns.push(`CARRIER - Xpress , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${slab*48}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*56}`)

            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE - ${slab*58}`)
    
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*49}`)

            selfDevelopedAns.push(`CARRIER - Express , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*43}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*53}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*80}`)

            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*64}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*83}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*40}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*61}`)

            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*43}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*131}`)

            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*64}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*123}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*40}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*130}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*55}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*80}`)

            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*43}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*193}`)

            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*37}`)

            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*198}`)

            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*36}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*232}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*36}`)

            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*156}`)
        
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*51}`)


        }
    
    }

    if(user[0].sourcePin == 734427 && user[0].destinationPin == 734301){

        console.log("zone====",user[0].zone)

        selfDevelopedAns.push(`Pick Up Pin Code-> ${sourcePin}   Delivery Pin Code-> ${destinationPin}`);
        selfDevelopedAns.push(user[0].zone)
        if(orderType == "COD"){
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE0 - AIR(0.5kg) , ESTIMATED PRICE - ${(weight/0.5)*58+Math.max((weight/100)*2,41)} `)
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${(weight/0.5)*79+Math.max((weight/100)*2.5,47)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${(weight/0.5)*55 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${(weight/0.5)*62 +Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE -${(weight/0.5)*74 +Math.max((weight/100)*2.5,43)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*53 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*46 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*63 +Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*104 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*73 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*89 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*43 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*74 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${(weight/1)*52 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*159 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*73 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*132 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${ (weight/2)*43 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${(weight/2)*146 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${ (weight/2)*67 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*90 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*52 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*229 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*44 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*215 + Math.max((weight/100)*2,55)}`)
            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*40 + Math.max((weight/100)*2,55)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*250 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*39 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*175 + Math.max((weight/100)*2,47)}`)
            
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*62 + Math.max((weight/100)*2,47)}`)
  
        }else{

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - AIR(0.5kg) , ESTIMATED PRICE - ${slab*58}`);
        
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*79}`);

            selfDevelopedAns.push(`CARRIER - Xpress , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${slab*55}`)

        selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*62}`)

        selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE - ${slab*74}`)
    
        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*53}`)

        selfDevelopedAns.push(`CARRIER - Express , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*46}`)

        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*63}`)

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*104}`)

        selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*73}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*89}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*43}`)

        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*74}`)

        selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*52}`)

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*159}`)

        selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*73}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*132}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*43}`)

        selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*146}`)

        selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*67}`)

        selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*90}`)

        selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*52}`)

        selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*299}`)

        selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*44}`)

        selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*215}`)

        selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*40}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*250}`)

        selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*39}`)

        selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*175}`)
        
        selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*62}`)


        }
    
    }


    if(user[0].sourcePin == 751001 && user[0].destinationPin == 401208){

      console.log("zone====",user[0].zone)

      selfDevelopedAns.push(`Pick Up Pin Code-> ${sourcePin}   Delivery Pin Code-> ${destinationPin}`);
      selfDevelopedAns.push(user[0].zone)
        if(orderType == "COD"){
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE0 - AIR(0.5kg) , ESTIMATED PRICE - ${(weight/0.5)*74+Math.max((weight/100)*2,41)} `)
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${(weight/0.5)*90+Math.max((weight/100)*2.5,47)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${(weight/0.5)*61 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE -${(weight/0.5)*78 +Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE -${(weight/0.5)*101 +Math.max((weight/100)*2.5,43)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*76 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*61 +Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE -${(weight/0.5)*83 +Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*143 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*100 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*103 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*51 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE -${(weight/1)*90 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${(weight/1)*63 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*211 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*100 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*153 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${ (weight/2)*51 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${(weight/2)*172 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${ (weight/2)*78 + Math.max((weight/100)*2,36)}`)
            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*120 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${(weight/2)*63 + Math.max((weight/100)*2,47)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*316 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*53 + Math.max((weight/100)*2,41)}`)
            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*311 + Math.max((weight/100)*2,55)}`)
            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*57 + Math.max((weight/100)*2,55)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*290 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*45 + Math.max((weight/100)*2,41)}`)
  
            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*211 + Math.max((weight/100)*2,47)}`)
            
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${(weight/2)*75 + Math.max((weight/100)*2,47)}`)
  
        }else{

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - AIR(0.5kg) , ESTIMATED PRICE - ${slab*74}`);
        
            selfDevelopedAns.push(`CARRIER - EcomExpress , SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*90}`);

            selfDevelopedAns.push(`CARRIER - Xpress , SHIPPING MODE - AIR (0.5kg),  ESTIMATED PRICE - ${slab*61}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(0.5kg), ESTIMATED PRICE - ${slab*78}`)

            selfDevelopedAns.push(`CARRIER - BlueDart , SHIPPING MODE - AIR (0.5kg) , ESTIMATED PRICE - ${slab*101}`)
    
            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*76}`)

            selfDevelopedAns.push(`CARRIER - Express , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*61}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(0.5kg) , ESTIMATED PRICE - ${slab*83}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*143}`)

            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*100}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*103}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*51}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*90}`)

            selfDevelopedAns.push(`CARRIER - Udaan add 1kg , SHIPPING MODE - SURFACE(1 kg) , ESTIMATED PRICE - ${((slab*0.5)/1)*63}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*211}`)

            selfDevelopedAns.push(`CARRIER - Delhivery add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*100}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*153}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*51}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot, SHIPPING MODE - AIR(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*172}`)

            selfDevelopedAns.push(`CARRIER - DTDC DotZot add 2kg, SHIPPING MODE - SURFACE(2 kg), ESTIMATED PRICE - ${((slab*0.5)/2)*78}`)

            selfDevelopedAns.push(`CARRIER - Udaan , SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*120}`)

            selfDevelopedAns.push(`CARRIER - Udaan add 1kg, SHIPPING MODE - SURFACE(2 kg) , ESTIMATED PRICE - ${((slab*0.5)/2)*63}`)

            selfDevelopedAns.push(`CARRIER - Delhivery , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*316}`)

            selfDevelopedAns.push(`CARRIER - Delhivery  add 1kg, SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*53}`)

            selfDevelopedAns.push(`CARRIER - Fedex  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*311}`)

            selfDevelopedAns.push(`CARRIER - Fedex add 1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*57}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*290}`)

            selfDevelopedAns.push(`CARRIER - Xpressbees add.1kg , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*45}`)

            selfDevelopedAns.push(`CARRIER - Udaan  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*211}`)
        
            selfDevelopedAns.push(`CARRIER - Udaan add.1kg  , SHIPPING MODE - SURFACE(5 kg) , ESTIMATED PRICE - ${((slab*0.5)/5)*75}`)



        }
    }

if(req.body.compare==1){
    console.log("hhygjbkn=========>",selfDevelopedAns)
    return selfDevelopedAns
}

////sace in db
    return res.render('apis',{
        name: req.session.name,
        selfDevelopedAns,
        shypliteData: undefined
    });

} catch(err){
    console.log(err);
    res.send("Something Went Wrong!!!!!!!!!!")
}
}



const shypApiForm =(req,res)=>{
    if(!req.session.isAuth){
        return res.render('login');
    }
   return res.render("apiform",{
    shypliteData: undefined
});
}

const generateAuth = () => {

    let sign = `key:${key}id:${appID}:timestamp:${timestamp}`
    let hash = crypto.createHmac(`sha256`, secret)
                     .update(sign)
                     .digest(`base64`).toString()

    let encoded = encodeURIComponent(hash)
    return encoded;
}

const shypliteCal = async (req,res)=>{
    try{
        console.log("bod=========>",req.body)
        let shypliteData = {}

        const { sourcePin, destinationPin, orderType, length, width, height, weight, invoiceValue } = req.body;
        if(!sourcePin || !destinationPin){
            res.send("Pin is missing!!!!!");
        }
        if(isNaN(sourcePin) || isNaN(destinationPin)){
            res.send("Pin is in alpha")
        }
        if(sourcePin.length!= 6) {
            res.send('Invalid sourcePin!')
        }
        if(destinationPin.length !=6){
            res.send('Invalid destinationPin!')
        }

        var js={ "sourcePin": req.body.sourcePin,
            "destinationPin": req.body.destinationPin,
            "orderType": req.body.orderType,
            "length": parseFloat(req.body.length),
            "width": parseFloat(req.body.width),
            "height": parseFloat(req.body.height),
            "weight": parseFloat(req.body.weight),
            "invoiceValue": parseFloat(req.body.invoiceValue)

        };
        console.log(js);    
        var encoded= generateAuth();

        if(!isNaN(js.length)&&!isNaN(js.width)&&!isNaN(js.height)&&!isNaN(js.weight) ){

        const price =   await request({
            uri:"https://api.shyplite.com/pricecalculator",
            method:"POST",
            body: js,
            headers: {
                "x-appid": appID,
                "x-sellerid": sellerID,
                "x-timestamp": timestamp,
                "x-version":'3', 
                "Authorization":encoded,
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(js).length
            },
            json: true
        });
        shypliteData.price=price.body.pricing
    }
    console.log("price -----",shypliteData.price)
     
       

        if(req.body.compare==1){
            console.log("INSIDE COMPAE=REdata->->->->->->",shypliteData);
            return shypliteData
        }
////save in db

// await query (`INSERT INTO profileData SET ?`,{
//     "username":req.session.name,
//     "apiCategory":"SHYPLITE",
//     "sourcePin": sourcePin,
//     "destinationPin": destinationPin
// })


// const user = await query(`SELECT * FROM profileData WHERE username='${req.session.name}' `);
console.log(user.response)
        return res.render('apis',{
            name: req.session.name,
            selfDevelopedAns:[],
            shypliteData,
            compareData:[]
        });
}

    catch(err){
console.log(err)
        return res.send('Something Went Wrong!!!!!');
    }
}



const compareform =(req,res)=>{
    if(!req.session.isAuth){
        return res.render('login');
    }
//    return res.render("apiform");
   return res.render("compare",{
    compareData: undefined
});
}

const compare = async(req,res)=>{
    try{
        console.log("req.body===============================",req.body)
        var body = req.body;
        req.body.compare =1;
        //  const compareData = []
         var a1 = await selfDevelopedCal(req,res)
         var a2 = await shypliteCal(req,res)
         console.log("retuuuuuuuuthfhydgjugcsyhvbasdkbysvjsd=====================",a1,a2)
        let compareData = {
            "selfdevelop" : a1,
            "shiplite"  : a2
        }
       //  compareData.push(`${selfDevelopedAns} || ${data}`)
console.log("comparedata-----------",compareData)
      //  return res.send(compareData)

        return res.render("apis",{
            name:req.session.name,
            selfDevelopedAns : a1,
            shypliteData : a2,
            compareData : compareData
            

         })
        // console.log("compareData======",compareData)

    }catch(error){
        res.send("Something went wrong in comparission!!!!!")
    }
}



module.exports = {selfDevelopedForm,selfDevelopedCal,shypApiForm,shypliteCal,logout,login,register,compareform,compare};

