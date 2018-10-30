'use strict';

/* I put everything in the same file because I'm f**king savage !
 * Please feel free to refactor */

const FAILURE_RATE = 0.2;
const path=require('path');
const express = require('express'), bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const randomVariables = require('./random_variables.js');
const router = express.Router();
var data=require('./data.js');

router.route('/templates')
    .get(function(req,res) {
        if (Math.random() <= FAILURE_RATE) {
            res.status(500).send("Something spilled their beer in the server ! Try again !")
        } else {
            res.json(randomVariables.getRandomTemplate());
        }
        // res.status(500).send("Something spilled their beer in the server ! Try again !")
    });

router.route('/answers')
    .post(function(req,res) {
        if (Math.random() <= FAILURE_RATE) {
            res.status(500).send("The dog ate your answers ! Try again !")
        } else {
            res.json({"status": "OK", "message" : "The answers were correctly registered for template id " + req.body.template_id});
        }
    });

// router.route('/getlist')
//     .post(function(req,res) {
//         res.json({code:0,data:data})
//     });
// router.route('/delItem')
//     .post(function(req,res) {
//         var _id=req.body.id;
//         for(var i=0;i<=data.length;i++){
//             if(data[i].id==_id){
//                 data.splice(i,1); 
//                 break;
//             }
//         }
//         res.json({code:0});
        
//     });
// router.route('/setItem')
//     .post(function(req,res) {
//         var params_data=req.body.json;
//         if(params_data.id){
//             for(var i=0;i<=data.length;i++){
//                 if(data[i].id==params_data.id){
//                     data[i]=params_data;
//                     break;
//                 }
//             }
//         }else{
//             params_data.id=Math.random();
//             data.push(params_data);
//         }
//         // console.log(params_data)
//         res.json({code:0,data:params_data});
//     });
app.use(router);

app.get('/', function (req, res) {
    // res.send('the server is running but you shouldn\'t be here.');
    var _html=path.resolve(__dirname, "../../build/dist/index.html")
    // console.log(_html)
    res.sendFile(_html);
});

app.use(express.static(path.resolve(__dirname, "../../build/dist")));
app.listen(9001, function () {
    console.log('Javascript tech lead test server listening on port 9001 !')
});