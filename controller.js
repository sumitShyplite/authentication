const express = require("express")
const bcrypt = require("bcryptjs")
const bodyparser = require("body-parser")
const crypto = require("crypto");
const util = require('util');
const requesting = require('request');
const { maxHeaderSize } = require("http");
const request = util.promisify(requesting);
const { db } = require('./dbconnection');
const base64 = require('base-64');
const utf8 = require('utf8');
var sha1 = require('sha1');



const timestamp = +new Date();
const key = "K4OuhK0B0f4=";
const appID = 7724;
const sellerID = 4225;
const secret = new Buffer("AwUT4GSgoH4pCJFPYMnAOj34C6/7Oy92HSjCMR7C1vD0hi5GOpKPUKhfv/nOd/cZVmerneEUigg9zyLyr7dFHw==")

///////////////////////////// Login  /////////////////////////////

const login = async (req, res) => {

    req.body.password = sha1(req.body.password);
    const { email, password } = req.body
    const user = await query(`SELECT name,password FROM user WHERE email='${email}' AND password='${password}'`);
    console.log("user=+++++++++++========>", user, user.name);
    if (user.length) {
        req.session.isAuth = true
        req.session.name = user[0].name;
        return res.redirect("/home")
    }

    return res.render('incorrects');
}
///////////////////////////// Register /////////////////////////////

const register = async (req, res) => {
    req.body.password = sha1(req.body.password);
    await query(`INSERT INTO user SET ?;`, req.body)
    return res.redirect("/login")

}
///////////////////////////// Logout /////////////////////////////

const logout = async (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/login")
    });
}
///////////////////////////// Self Developed Price Calculator /////////////////////////////

const selfDevelopedForm = (req, res) => {
    if (!req.session.isAuth) {
        return res.render('login');
    }
    return res.render("selfCalculatedPrice", {
        selfDevelopedAns: undefined
    });
}


const selfDevelopedCal = async (req, res) => {
    try {
        console.log("request body :=: (selfDevelopCal) :=: ", req.body);
        let sourcePin = req.body.sourcePin;
        let destinationPin = req.body.destinationPin;
        let orderType = req.body.orderType;
        let length = req.body.length;
        let width = req.body.width
        let height = req.body.height
        let dimension = (length * width * height)
        let weight = req.body.weight;
        let invoice = req.body.invoiceValue || '';

        if (!sourcePin || !destinationPin) {
            res.send("Pin is missing!!!!!");
        }
        if (isNaN(sourcePin) || isNaN(destinationPin)) {
            res.send("Pin is in alpha")
        }
        if (sourcePin.length != 6) {
            res.send('Invalid sourcePin!')
        }
        if (destinationPin.length != 6) {
            res.send('Invalid destinationPin!')
        }
        await query (`INSERT INTO userInformation (sourcePin,destinationPin,orderType,length,width,height,weight,invoiceValue) 
            VALUES(${sourcePin},${destinationPin},'${orderType}',${length},${width},${height},${weight},'${invoice}')`);

        const selfDevelopedAns = [];
        const air_COD = 5000;
        const lite_COD = 4000
        const user = await (query(`SELECT * FROM pincodes WHERE (sourcePin = '${sourcePin}' AND destinationPin='${destinationPin}') OR (sourcePin = '${destinationPin}' AND destinationPin='${sourcePin}') `));
        const price_Calculator = await query(`SELECT * FROM Price_Calculator`)
        if (user.length == 0) {
            res.send("we do not provide service at your pincode!!!!!")
        }
        let zone = user[0].zone;
        let additional = `ADD_${zone}`

        if (orderType == "cod") {
            selfDevelopedAns.push(`Pin Is With In ${user[0].zone}`)
            for (var i = 0; i < price_Calculator.length; i++) {
                let slabCod = weight / price_Calculator[i].Weight_Category
                let a = price_Calculator[i][zone]
                let b = dimension / lite_COD * price_Calculator[i][zone]
                let c = price_Calculator[i][zone] + (slabCod - 1) * price_Calculator[i].Weight_Category * price_Calculator[i][additional]
                let d = Math.max((weight / 100) * price_Calculator[i].CODpercentage, price_Calculator[i].MinCOD)
                if (price_Calculator[i].Weight_Category == 0.5) {
                    c = price_Calculator[i][zone] * slabCod;
                }
                let amountCod = Number(Math.max(a, b, c) + d)
                selfDevelopedAns.push(`Mode - ${price_Calculator[i].Mode},Carrier - ${price_Calculator[i].Carrier},Estimated Price - ${amountCod}`)

            }
        }

        else {
            selfDevelopedAns.push(`Pin Is With In ${user[0].zone}`)
            for (var i = 0; i < price_Calculator.length; i++) {
                let slab = weight / price_Calculator[i].Weight_Category
                let p = dimension / lite_COD * price_Calculator[i][zone]
                let q = price_Calculator[i][zone]
                let r = price_Calculator[i][zone] + (slab - 1) * price_Calculator[i].Weight_Category * price_Calculator[i][additional]
                if (price_Calculator[i].Weight_Category == 0.5) {
                    r = price_Calculator[i][zone] * slab
                }
                let amountPrepaid = Number(Math.max(p, q, r));
                selfDevelopedAns.push(`Mode - ${price_Calculator[i].Mode},Carrier - ${price_Calculator[i].Carrier},Estimated Price -${amountPrepaid}`)
            }
        }

        if (req.body.compare == 1) {
            console.log("selfDevelopedAns=========>", selfDevelopedAns)
            return selfDevelopedAns
        }
        return res.render('apis', {
            name: req.session.name,
            selfDevelopedAns,
            shypliteData: undefined,
            x: 1,
            y: 5,
            z: 5
        });

    } catch (err) {
        console.log(err);
        res.send("Something Went Wrong In Self Developed Calculator!!!!!!!!!!")
    }
}
///////////////////////////// Shyplite Price Calculator /////////////////////////////

const shypApiForm = (req, res) => {
    if (!req.session.isAuth) {
        return res.render('login');
    }
    return res.render("shypApiform", {
        shypliteData: undefined
    });
}
const generateAuth = () => {
    let sign = `key:${key}id:${appID}:timestamp:${timestamp}`
    let hash = crypto.createHmac(`sha256`, secret).update(sign).digest(`base64`).toString()
    let encoded = encodeURIComponent(hash)
    return encoded;
}

const shypliteCal = async (req, res) => {
    try {
        let shypliteData = {}
        const { sourcePin, destinationPin, orderType, length, width, height, weight, invoiceValue } = req.body;
        if (!sourcePin || !destinationPin) {
            res.send("Pin is missing!!!!!");
        }
        if (isNaN(sourcePin) || isNaN(destinationPin)) {
            res.send("Pin is in alpha")
        }
        if (sourcePin.length != 6) {
            res.send('Invalid sourcePin!')
        }
        if (destinationPin.length != 6) {
            res.send('Invalid destinationPin!')
        }
        var js = {
            "sourcePin": req.body.sourcePin,
            "destinationPin": req.body.destinationPin,
            "orderType": req.body.orderType,
            "length": parseFloat(req.body.length),
            "width": parseFloat(req.body.width),
            "height": parseFloat(req.body.height),
            "weight": parseFloat(req.body.weight),
            "invoiceValue": parseFloat(req.body.invoiceValue)

        };
        console.log("request.body :(Shyplite):", js);
        var encoded = generateAuth();
        if (!isNaN(js.length) && !isNaN(js.width) && !isNaN(js.height) && !isNaN(js.weight)) {
            const price = await request({
                uri: "https://api.shyplite.com/pricecalculator",
                method: "POST",
                body: js,
                headers: {
                    "x-appid": appID,
                    "x-sellerid": sellerID,
                    "x-timestamp": timestamp,
                    "x-version": '3',
                    "Authorization": encoded,
                    "Content-Type": "application/json",
                    "Content-Length": JSON.stringify(js).length
                },
                json: true
            });
            shypliteData.price = price.body.pricing
        }
        console.log("Shyplite price -----", shypliteData.price)



        if (req.body.compare == 1) {
            console.log("INSIDE COMPARE data->->->->->->", shypliteData);
            return shypliteData
        }
        return res.render('apis', {
            name: req.session.name,
            selfDevelopedAns: [],
            shypliteData,
            compareData: [],
            x: 5,
            y: 1,
            z: 5
        });
    }

    catch (err) {
        console.log(err)
        return res.send('Something Went Wrong In Shyplite Calculator!!!!!');
    }
}


///////////////////////////// Compare Between Shyplite And Self Developed Calculator /////////////////////////////

const compareform = (req, res) => {

    if (!req.session.isAuth) {
        return res.render('login');
    }
    return res.render("compare", {
        compareData: undefined
    });
}




const compare = async (req, res) => {
    try {
        var body = req.body;
        req.body.compare = 1;
        var selfDevelopedFun = await selfDevelopedCal(req);
        var shypliteFun = await shypliteCal(req, res);
        console.log("haaahbaahhahaha")
        return res.render("apis", {
            name: req.session.name,
            selfDevelopedAns: selfDevelopedFun,
            shypliteData: shypliteFun,
            x: 5,
            y: 5,
            z: 1
        })

    } catch (error) {
        res.send("Something went wrong in Comparission Calculator!!!!!")
    }
}



module.exports = { selfDevelopedForm, selfDevelopedCal, shypApiForm, shypliteCal, logout, login, register, compareform, compare };

