var request = require('request');
var count = 0;
for(var i=0;i<10000;i++){
    request.get('http://www.peerspace.com/spaces/ca_san-francisco_south-of-market_awe-inspiring-historic-theater_event_cd2926119db111e3a77e064cf8c38b5b',function(err, resp, body){
        count++;
        console.log(count);
    });
}
