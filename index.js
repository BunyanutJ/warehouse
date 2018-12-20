const express = require('express');
const app = express(); // use function in express
const port = 3000; // custom port
const bodyParser = require('body-parser');// user html body
const cors = require('cors');
const path = require('path');
const md5 = require('md5');
var MongoClient = require('mongodb').MongoClient;
// var format = require('util').format;
const mongoserver = '127.0.0.1:27017/test';
const mongouserpass = 'b-kung:1234';
let fullmongodbURL = 'mongodb://'+mongouserpass+'@'+mongoserver;

// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }));

// app.use(express.static('assets/html'));
app.use(bodyParser.json()); // create json body html
app.use(bodyParser.urlencoded({ extended: true })); // create json form to send data
app.use('/css',express.static(path.join(__dirname, 'assets/css')));
app.use('/js',express.static(path.join(__dirname, 'assets/js')));


app.listen(port, () => console.log('Web Api running on port \nhttp://127.0.0.1:'+port));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/assets/html/login.html'));
});

app.post('/login',(req,res)=>{
    let mergemd5 = md5(req.body.user)+md5(req.body.pass);
    mergemd5 = md5(mergemd5);
    let keyslot = '{"username" : "'+req.body.user + '","password" : "'+req.body.pass+'","key" : "'+mergemd5+'"}';
    // console.log(keyslot);
    keyslot = JSON.parse(keyslot);
    // console.log(keyslot);
    // res.send(keyslot);
    MongoClient.connect(fullmongodbURL,{ useNewUrlParser: true },function(err,client){
        if(err) throw err;
        else{
            let db = client.db().collection('registeration');
            // db.insert(keyslot);
            db.find(keyslot).toArray(function(err,result){
                if(err) throw err;
                else{
                    let new_result = JSON.stringify(result);
                    console.log(new_result);
                    // res.send(new_result);
                    if(new_result=="[]"){
                        console.log("not found");
                        res.send("not found");
                    }
                    else{
                        res.send(new_result);
                    }
                }
            });
            
        }
        client.close();
    })
});

app.get('/registeration',(req,res)=>{
    res.sendFile(path.join(__dirname + '/assets/html/registeration.html'));
});

app.post('/registeration',(req,res)=>{
    let mergemd5 = md5(req.body.user)+md5(req.body.pass);
    mergemd5 = md5(mergemd5);
    let keyslot = '{"username" : "'+req.body.user + '","password" : "'+req.body.pass+'","key" : "'+mergemd5+'"}';
    // console.log(keyslot);
    keyslot = JSON.parse(keyslot);
    // console.log(keyslot);
    // res.send(keyslot);
    MongoClient.connect(fullmongodbURL,{ useNewUrlParser: true },function(err,client){
        if(err) throw err;
        else{
            let db = client.db().collection('registeration');
            // db.insert(keyslot);
            db.find(keyslot).toArray(function(err,result){
                if(err) throw err;
                else{
                    let new_result = JSON.stringify(result);
                    console.log(new_result);
                    // res.send(new_result);
                    if(new_result=="[]"){
                        db.insertOne(keyslot);
                        console.log("register complete");
                        res.send("register complete");
                    }
                    else{
                        console.log("username or password is already exists");
                        res.send("username or password is already exists");
                    }
                }
            });
            
        }
        client.close();
    })
});

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname + '/assets/html/index.html'));
});

app.get('/inventory/:order',(req,res)=>{
    res.send("Hello World"+req.params.order);
});

