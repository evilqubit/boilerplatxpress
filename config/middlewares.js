var winston = require('winston');

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
