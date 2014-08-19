## PeerSpace REST API

### Entry Points
Method | Resource | Description
---|---|---|
GET | [api/spaces/:id]() | Returns a single space, specified by the id parameter. The JSON response is rendered using hogan.js template engine and cached as an html file into /public/spaces directory
GET |[api/spaces/]() | Returns all spaces with the optional parameters skip and limit. default: skip=0 and limit=200
GET | [api/spaces/search/]() | Searched spaces by name. Returns all spaces specified by a search query. Parameters: q, skip and limit. default: skip=0 and limit=200
POST |[ api/spaces/]() | Add new space
PUT |[ api/spaces/:id]() | Updates single space specified by the id parameter
DEL |[ api/spaces/:id]() | Delete single space specified by the id parameter


### Testing
```
cd test/
node test
```
