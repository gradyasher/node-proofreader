var request = require("request");

var options = { method: 'POST',
  url: 'http://api.meaningcloud.com/stilus-1.2',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: 
   { key: '8959f684e2ee2e36c6f48d5da9327202',
     lang: 'en',
     txt: 'Hello you name is' 
   }}

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});