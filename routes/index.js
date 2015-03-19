var express = require('express');
var router = express.Router();

var crypto = require('crypto');
function sha1(str) {
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}


/* GET home page. */
router.get('/', function(req, res) {
    var content = req.param("Content");
    console.log(content);
    var query = req.query;
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "charmyintoken";//这里填写你的token
    oriArray.sort();
    var original = oriArray[0]+oriArray[1]+oriArray[2];
    console.log("Original Str:"+original);
    console.log("signature:"+signature);
    var scyptoString = sha1(original);
    if (signature == scyptoString) {
        res.send(echostr);
    }
    else {
        res.send("Bad Token!");
    }
});

/* GET home page. */
router.post('/', function(req, res) {
    var content = req.param("Content");
    console.log(content);
    res.send("<xml>\
    <ToUserName><![CDATA[toUser]]></ToUserName>\
    <FromUserName><![CDATA[fromUser]]></FromUserName>\
    <CreateTime>12345678</CreateTime>\
    <MsgType><![CDATA[text]]></MsgType>\
    <Content><![CDATA[你好]]></Content>\
    </xml>");
});


module.exports = router;
