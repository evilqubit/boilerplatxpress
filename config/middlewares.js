var winston = require('winston');
var Bitly = require('bitly');
var bitly = new Bitly('o_2o6vdo5f18', 'R_3190110b3a874c79951e398b7d279b7a');

exports.restrictToIP = function(req, res, next) {
    /*White List
    * 108.168.*.*
    */
    if(process.env.NODE_ENV == 'prod'){
        var ip = "127.0.0.1";
        if(typeof req.headers['x-forwarded-for'] !== 'undefined'){
                  var ip = req.headers['x-forwarded-for'];
        }
        var ip_arr = ip.split(".");
        if(ip_arr[0] == '108' && ip_arr[1] == '168') next();
        else {
                winston.error("RESTRICTED SEARCH fROM: " + ip);
                return res.redirect("http://www.peerspace.com/4.04.4004");
        }

    }
    else {
        next();
    }
}

exports.bitlyURL = function(req,res,next){
    //var longURI = 'http://'+res.req.headers.host+res.req.url;
    var longURI = 'http://www.peerspace.com/spaces/'+res.req.url;
    bitly.shorten(longURI, function(err, response) {
      if (err) winston.error("SEARCH BITLY: " + short_url);
      else {
            var short_url = response.data.url
            winston.info("SEARCH BITLY: " + short_url);
            res.redirect(short_url);
            next();
      }
    });
}
