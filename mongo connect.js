var MongoClient = require('mongodb').MongoClient

// var format = require('util').format;
const mongoserver = '127.0.0.1:27017/test';
// { useNewUrlParser: true } ใช้ลบการแจ้งเตือนของระบบในการเชื่อมต่อ ดาต้าเบส


// ไม่ปลอดภัย ไม่ได้ระบุดาต้าเบสในการเข้าถึง แต่ทำให้เข้าถึงได้ทุกดาต้าเบส ภายในดาต้าเบสเซิฟเวอร์ และไม่ได้กำหนดยูสเซอร์ในดาต้าเบสใด ดาต้าเบสหนึง
// MongoClient.connect('mongodb://'+mongoserver,{ useNewUrlParser: true },function(err,client){
//     if(err){
//         throw err;
//     }
//     else{
//         var db = client.db('test').collection('customer');
  
//         db.find().toArray(function (err, result) {
//             if (err) throw err

//             console.log(result)
//         })
//         console.log("connected");
//     }
//     client.close();
// })


MongoClient.connect('mongodb://b-kung:1234@'+mongoserver,{ useNewUrlParser: true },function(err,client){
    if(err){
        throw err;
    }
    else{
        var db = client.db().collection('registeration');

        db.insert(
            [
                {
                    "recieve":[
                        {
                            "inventoryname":"fresh",
                            "wavehousename":"fresh warehouse",
                            "zone":"a",
                            "row":1,
                            "colum":3,
                            "amount":10,
                            "datetime":"32/13/9999"
                        }
                    ]
        },
        {
                "export":[
                {
                    "inventoryname":"fresh",
                    "wavehousename":"fresh warehouse",
                    "zone":"a",
                    "row":1,
                    "colum":3,
                    "amount":10,
                    "datetime":"32/13/9999"
                }
            ]
        }
    ]
            );
  
        db.find().toArray(function (err, result) {
            if (err) throw err

            console.log(result)

        })
        console.log("connected");
    }
    client.close();
})



app.get('/registeration/user/:user/pass/:pass',(req,res)=>{
    tryround = tryround + 1;
    console.log("try round = "+tryround);
    let mergemd5 = md5(req.params.user)+md5(req.params.pass);
    mergemd5 = md5(mergemd5);
    
    // let pre_data = '{"key":"'+mergemd5+'"}';
    // console.log(pre_data);
    // res.send("user : "+req.params.user+"<br>"
    //          +"pass : "+req.params.pass+"<br>"
    //          +"Md5 user : "+md5(req.params.user)+"<br>"
    //          +"Md5 pass : "+md5(req.params.pass)+"<br>"
    //          +"Merge Md5 : "+mergemd5
    //          );
    MongoClient.connect(fullmongodbURL,{ useNewUrlParser: true },function(err,client){
        if(err) throw err;
        else{
            var db = client.db().collection('registeration');
            var found = "";
            // db.insertOne({"key":mergemd5});
            db.find({'key':mergemd5}).toArray(function(err,result){
                if(err) throw err;
                else{
                    console.log(result);
                    found = result;
                    res.send("natchapon label"+found);
                }
                
            });
            console.log("result : "+found);
            if(found){
                console.log("data is already exists");
                res.send("bunyanut label"+found);
                console.log("3");
                
            }
            console.log("4");
            // else{
            //     db.insertOne({"key":mergemd5});
                // db.find({'key':mergemd5}).toArray(function(err,result){
                //     if(err) throw err;
                //     else{
                //         // console.log(result);
                //         found = result;
                //         // res.send(found);
                //     }
                    
                // });
                // console.log("register complete "+found);
                // res.send("register complete "+found);
                // res.send("completed register");
            // }
        }
    });
});