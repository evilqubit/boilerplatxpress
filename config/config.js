var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  dev: {
      db: 'mongodb://localhost/peerspace',
      root: rootPath,
      app: {
        name: 'PeerSpace REST API - DEV'
      },
      sta: '/spaces'
  },
  prod: {
      db: 'mongodb://',
      root: rootPath,
      app: {
        name: 'PeerSpace REST API'
    },
      sta: '/'
  }
}
