var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var wechat = require('wechat');

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

    wechat('charmyintoken', function (req, res, next) {
      // message is located in req.weixin
      var message = req.weixin;
      console.log(message);
      if (message.FromUserName === 'diaosi') {
        // reply with text
        res.reply('hehe');
      } else if (message.FromUserName === 'text') {
        // another way to reply with text
        res.reply({
          content: 'text object',
          type: 'text'
        });
      } else if (message.FromUserName === 'hehe') {
        // reply with music
        res.reply({
          type: "music",
          content: {
            title: "Just some music",
            description: "I have nothing to lose",
            musicUrl: "http://mp3.com/xx.mp3",
            hqMusicUrl: "http://mp3.com/xx.mp3"
          }
        });
      } else {
        // reply with thumbnails posts
        res.reply([
          {
            title: 'Come to fetch me',
            description: 'or you want to play in another way ?',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
          }
        ]);
      }
    });

    /*var content = req.param("Content");
    console.log(req.params);
    res.send("<xml>\
    <ToUserName><![CDATA[toUser]]></ToUserName>\
    <FromUserName><![CDATA[fromUser]]></FromUserName>\
    <CreateTime>12345678</CreateTime>\
    <MsgType><![CDATA[text]]></MsgType>\
    <Content><![CDATA[你好]]></Content>\
    </xml>");*/
});


module.exports = router;
