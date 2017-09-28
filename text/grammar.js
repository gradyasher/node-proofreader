const request = require('request')

function grammar(text) {
	return new Promise(resolve => {

		const options = { method: 'POST',
		  url: 'https://languagetool.org/api/v2/check',
		  headers: { 
		    'content-type': 'application/x-www-form-urlencoded',
		    'Accept':'application/json'
		  },
		  form: { 
		     language: 'en-US',
		     enabledOnly: false,
		     text
		  }
		 }

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  const matches = JSON.parse(body).matches
		   
		  const tracker = {
		    text: text.split(''),
		    change: 0
		  }

		  const grammered = matches.reduce((obj, mistake) => {
		    
		    const { offset, length, replacements } = mistake

		      obj.text = [
		        ...obj.text.slice(0, offset + obj.change),
		        ...replacements[0].value.split(''),
		        ...obj.text.slice(offset + length + obj.change)
		      ]
		      
		      if(replacements[0].value.length != length) {
		        obj.change += (replacements[0].value.length - length)
		      }

		      return obj
		      
		  }, tracker)

		  resolve(grammered.text.join(''))
		});
	})
}

module.exports = { grammar }